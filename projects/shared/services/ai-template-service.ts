import { AIGeneratorRequest, AIGeneratorResult, AIProvider, AIProviderConfig, AIStreamCallback } from '../types/ai.interface';
import { VirtualHTMLParser } from '../utils/virtual-html-parser';

export class AITemplateService {
  private static SYSTEM_PROMPT = `
Bạn là một AI Chuyên gia Thiết kế Biểu Mẫu & Bản In (Document & Print Form Designer) hàng đầu cho hệ thống Micro-Frontend Vue 3 + Angular.
Nhiệm vụ của bạn là nhận yêu cầu hoặc hình ảnh tài liệu scan và sinh ra một biểu mẫu hoàn chỉnh gồm: Template HTML/Vue DSL, JavaScript Reactive Script, và Initial Context Data.

HỆ THỐNG CỦA CHÚNG TÔI SỬ DỤNG CÁC COMPONENT SAU ĐÂY:
1. Bố cục trang:
   - <PageA4 style="padding: 10mm 15mm;">...</PageA4> (Dọc)
   - <PageA4 :landscape="true" style="padding: 10mm 15mm;">...</PageA4> (Ngang)
   - <PageA5 style="padding: 8mm 12mm;">...</PageA5> (Dọc)
   - <PageA5 :landscape="true" style="padding: 8mm 12mm;">...</PageA5> (Ngang)
   - Lưới cột: <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 8px 0;">...</div>
   - Bảng dữ liệu: <table style="width: 100%; border-collapse: collapse; margin: 8px 0;" border="1">...</table>

2. Thành phần nhập liệu & Form:
   - <Textarea v-model="data.fieldName" label="Nhãn trường:" line /> (hoặc :line="true", :rows="2|3", :suffix="{ length: 1, char: '...' }")
   - <InputOTP v-model="data.otpField" :mask-length="[1,1,1,1]" pad-start="0" />
   - <Select v-model="data.selectField" label="Danh mục:" :items="categoryList" bind-label="name" bind-value="id" />
   - <Select v-model="data.tagField" label="Tags:" :items="tagList" bind-label="label" bind-value="value" multiple />
   - <DatePicker v-model="data.dateField" label="Ngày:" format="DD/MM/YYYY" placeholder="DD/MM/YYYY" />
   - <Checkbox v-model="data.checkField" afterText="Văn bản đi kèm" size="md" :native="true" />
   - <Paint v-model="data.signature" label="Chữ ký:" style="width: 250px; height: 110px;" />

3. Quy định Script:
   - Sử dụng cú pháp Vue 3 Composition API:
     const data = reactive($context.data || {});
     // Các biến danh mục, computed logic...
     return { data, ... };

4. BẮT BUỘC TRẢ VỀ ĐỊNH DẠNG JSON DUY NHẤT VỚI CÁC TRƯỜNG:
{
  "template": "<PageA4...>...</PageA4>",
  "script": "const data = reactive($context.data || {});\\nreturn { data };",
  "context": {
    "data": { ... }
  },
  "summary": "Mô tả ngắn gọn bằng tiếng Việt về biểu mẫu đã sinh"
}
`;

  /**
   * Lấy danh sách Model trực tiếp và động từ OmniRoute Gateway API (/v1/models)
   */
  public static async fetchModels(
    endpoint?: string,
    apiKey?: string
  ): Promise<{ id: string; name: string; description?: string }[]> {
    const key = apiKey?.trim() || '';
    let base = (endpoint?.trim() || 'https://n8nz.io.vn').replace(/\/+$/, '');

    // Nếu người dùng nhập trực tiếp Google Gemini API Key (AIzaSy...)
    if (key.startsWith('AIzaSy') && (!endpoint || endpoint.includes('n8nz.io.vn') || endpoint.includes('localhost'))) {
      try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        if (geminiRes.ok) {
          const gJson = await geminiRes.json();
          if (Array.isArray(gJson.models)) {
            return gJson.models
              .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
              .map((m: any) => {
                const cleanId = m.name?.replace(/^models\//, '') || m.name;
                return {
                  id: cleanId,
                  name: `⚡ ${m.displayName || cleanId} (${cleanId})`,
                  description: m.description || 'Google Gemini Model'
                };
              });
          }
        }
      } catch (e) {
        console.warn('Lỗi probe Gemini models:', e);
      }
    }

    // Chuẩn hóa endpoint OpenAI / OmniRoute với cờ configuredOnly=true
    if (!base.endsWith('/v1') && !base.endsWith('/models')) {
      base = `${base}/v1`;
    }
    const cleanBase = base.endsWith('/models') ? base : `${base}/models`;
    const url = `${cleanBase}?configuredOnly=true`;

    const headers: Record<string, string> = {
      'Accept': 'application/json'
    };
    if (key) {
      headers['Authorization'] = `Bearer ${key}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      let errDetail = `HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson?.error?.message) {
          errDetail = errJson.error.message;
        }
      } catch {}
      throw new Error(errDetail);
    }

    const json = await response.json();
    const modelList = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);

    if (modelList.length > 0) {
      return modelList.map((m: any) => {
        const owner = m.owned_by ? `[${m.owned_by}] ` : '';
        const name = m.name || m.id;
        return {
          id: m.id,
          name: `${owner}${name}`,
          description: m.description || m.owned_by || ''
        };
      });
    }

    return [];
  }

  /**
   * Gọi AI sinh biểu mẫu từ Prompt, Image hoặc Tweak (Hỗ trợ Streaming Callback)
   */
  public static async generate(
    request: AIGeneratorRequest,
    config?: Partial<AIProviderConfig>,
    onChunk?: AIStreamCallback
  ): Promise<AIGeneratorResult> {
    const apiKey = config?.apiKey?.trim() || 'omniroute';
    const model = config?.model || 'auto';
    return await this.callOmniRouteStreamAPI(request, apiKey, model, config?.customEndpoint, onChunk);
  }

  /**
   * Gọi OmniRoute AI Gateway API dạng SSE Streaming
   */
  private static async callOmniRouteStreamAPI(
    request: AIGeneratorRequest,
    apiKey: string,
    model: string,
    customEndpoint?: string,
    onChunk?: AIStreamCallback
  ): Promise<AIGeneratorResult> {
    let base = (customEndpoint?.trim() || 'https://n8nz.io.vn').replace(/\/+$/, '');
    if (!base.endsWith('/v1') && !base.endsWith('/chat/completions')) {
      base = `${base}/v1`;
    }
    const url = base.endsWith('/chat/completions') ? base : `${base}/chat/completions`;

    const messages: any[] = [
      { role: 'system', content: this.SYSTEM_PROMPT }
    ];

    let userContent: any = `Yêu cầu sinh biểu mẫu:\n`;
    if (request.pageSize) userContent += `- Khổ giấy: ${request.pageSize} (${request.orientation || 'portrait'})\n`;
    if (request.theme) userContent += `- Phong cách: ${request.theme}\n`;
    userContent += `- Nội dung / Mô tả: ${request.prompt}\n`;

    if (request.currentTemplate && request.mode === 'tweak') {
      userContent += `\n--- TEMPLATE HIỆN TẠI ---\n${request.currentTemplate}\n`;
      userContent += `\nHành động tối ưu yêu cầu: ${request.tweakAction || 'Tối ưu bố cục'}\n`;
    }

    if (request.imageData) {
      userContent = [
        { type: 'text', text: userContent },
        { type: 'image_url', image_url: { url: request.imageData } }
      ];
    }

    messages.push({ role: 'user', content: userContent });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey || 'omniroute'}`
      },
      body: JSON.stringify({
        model: model || 'auto',
        messages,
        stream: true,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OmniRoute API Error [${response.status}]: ${errText}`);
    }

    if (!response.body) {
      throw new Error('Response body is empty');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let fullAccumulatedText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data: ')) {
          const jsonStr = trimmed.slice(6);
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              fullAccumulatedText += delta;
              onChunk?.(delta, fullAccumulatedText);
            }
          } catch (e) {
            // partial chunk ignored
          }
        }
      }
    }

    if (!fullAccumulatedText.trim()) {
      throw new Error('OmniRoute API không trả về dữ liệu.');
    }

    return this.parseAndSanitizeAIResponse(fullAccumulatedText, 'omniroute', model || 'auto');
  }

  /**
   * Phân tích và làm sạch JSON trả về từ LLM
   */
  private static parseAndSanitizeAIResponse(
    rawText: string,
    provider: AIProvider,
    model: string
  ): AIGeneratorResult {
    let cleanJson = rawText.trim();
    // Bỏ markdown block nếu có
    cleanJson = cleanJson.replace(/^```(json|html|xml)?/i, '').replace(/```$/i, '').trim();

    try {
      const parsed = JSON.parse(cleanJson);
      let template = parsed.template || '';
      let script = parsed.script || 'const data = reactive($context.data || {});\nreturn { data };';
      let context = parsed.context || { data: {} };
      let summary = parsed.summary || 'Biểu mẫu đã được sinh thành công bởi AI.';

      // Đảm bảo template có các c-id hợp lệ
      template = this.ensureComponentIds(template);

      return {
        template,
        script,
        context,
        summary,
        usedProvider: provider,
        usedModel: model
      };
    } catch (e: any) {
      console.error('Lỗi phân tích JSON từ AI:', e, rawText);
      throw new Error('Dữ liệu AI trả về không đúng cấu trúc JSON mong đợi: ' + e.message);
    }
  }

  /**
   * Tự động gán c-id cho toàn bộ node nếu AI trả về HTML thô chưa có c-id
   */
  public static ensureComponentIds(html: string): string {
    if (!html || !html.trim()) return '';
    try {
      const rootNode = VirtualHTMLParser.parseToTree(html, 'Root', { 'c-id': 'root_gen' });
      rootNode.innerHTML = html;
      rootNode.genComponentId(true);
      return rootNode.innerHTML;
    } catch (e) {
      return html;
    }
  }
}

