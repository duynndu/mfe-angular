import { AIGeneratorRequest, AIGeneratorResult, AIProvider, AIProviderConfig, AIStreamCallback } from '../types/ai.interface';
import { VirtualHTMLParser } from '../utils/virtual-html-parser';

export class AITemplateService {
  public static SYSTEM_PROMPT_UI = `
Bạn là AI Chuyên gia Thiết kế Giao Diện Web / Ứng Dụng (UI/UX Designer & Frontend Engineer) xuất sắc cho nền tảng Vue 3 + Angular Micro-Frontend.
Nhiệm vụ của bạn là hiện thực hóa giao diện màn hình hoàn chỉnh, hiện đại, thẩm mỹ cao (Login, Dashboard, Portal, Form hồ sơ, v.v.) dựa trên yêu cầu của người dùng hoặc chỉnh sửa mẫu giao diện đang có.

QUY TẮC CỐT LÕI BẮT BUỘC:
1. 100% THẺ HTML THUẦN (Native HTML Tags):
   - SỬ DỤNG: <div>, <form>, <input>, <button>, <select>, <option>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <label>, <span>, <p>, <h1>-<h6>, <nav>, <header>, <section>, <ul>, <li>, và icon FontAwesome 4.7 <i class="fa fa-..."></i>.
   - TUYỆT ĐỐI KHÔNG DÙNG các thẻ biểu mẫu in ấn: <PageA4>, <PageA5>, <Textarea>, <InputOTP>, <DatePicker>, <Checkbox>, <Paint>. Các thẻ này chỉ dành riêng cho bản in tài liệu!

2. STYLE BẰNG INLINE CSS ĐỈNH CAO (Aesthetics & Modern SaaS UI):
   - Layout: Flexbox, CSS Grid hiện đại, responsive.
   - Bảng màu hiện đại (Modern SaaS palette: #0f172a, #1e293b, #3b82f6, #10b981, #f8fafc, gradient mượt mà).
   - Bo tròn mềm mại (border-radius: 8px - 16px), bóng đổ tinh tế (box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)), viền mỏng (border: 1px solid #e2e8f0).
   - Phù hợp với mọi yêu cầu phong cách (Light, Dark Mode, Glassmorphism, Clean Medical Portal, v.v.).

3. VUE 3 COMPOSITION API SCRIPT CHUẨN XÁC:
   - Sử dụng cú pháp Vue 3: const data = reactive($context.data || { ... });
   - KHAI BÁO VÀ RETURN 100% TẤT CẢ BIẾN & HÀM: Mọi biến (loading, errorMessage, successMessage, showPassword...) và hàm (handleLogin, togglePassword, submitForm...) xuất hiện trong template BẮT BUỘC phải được khai báo và return đầy đủ trong script.
   - KHỞI TẠO MẢNG TRONG CONTEXT: Nếu template duyệt mảng hoặc bind v-model vào mảng (ví dụ data.otp[i]), context.data bắt buộc phải có mảng tương ứng.
   - Modifier chuẩn: @submit.prevent="...", @click.prevent="...".

4. TỰ ĐỘNG XỬ LÝ CẢ HAI TÌNH HUỐNG (TẠO MỚI HOẶC SỬA ĐỔI):
   - Nếu có "MÃ TEMPLATE HIỆN TẠI": Bạn đang trong chế độ tinh chỉnh/sửa đổi. Hãy bảo tồn tối đa bố cục, phong cách, các trường và logic hiện có, chỉ thực hiện chính xác các chỉnh sửa/bổ sung mà người dùng yêu cầu.
   - Nếu KHÔNG có template hiện tại (hoặc người dùng yêu cầu làm mới hoàn toàn): Hãy thiết kế một giao diện trọn vẹn, đẹp mắt từ đầu.

ĐỊNH DẠNG TRẢ VỀ BẮT BUỘC (JSON DUY NHẤT, KHÔNG THÊM BẤT KỲ VĂN BẢN NÀO NGOÀI JSON):
{
  "template": "<div style=\\"...\\">...</div>",
  "script": "const data = reactive($context.data || {});\\nreturn { data };",
  "context": { "data": { ... } },
  "summary": "Tóm tắt ngắn gọn những gì đã tạo hoặc chỉnh sửa"
}
`;

  public static SYSTEM_PROMPT_DOCUMENT = `
Bạn là AI Chuyên gia Thiết kế Mẫu Biểu & Bản In Y Tế / Hành Chính (Print Document & Medical Form Expert) xuất sắc cho nền tảng Vue 3 + Angular Micro-Frontend.
Nhiệm vụ của bạn là hiện thực hóa mẫu biểu tài liệu in ấn chuẩn xác (Đơn thuốc, Phiếu khám bệnh, Kết quả xét nghiệm, Phiếu thu, Biên bản, Giấy ra viện, v.v.) dựa trên yêu cầu của người dùng hoặc chỉnh sửa mẫu biểu đang có.

QUY TẮC CỐT LÕI BẮT BUỘC KHI THIẾT KẾ MẪU PHIẾU / BẢN IN:
1. KHUNG KHỔ GIẤY CHUẨN:
   - Toàn bộ nội dung biểu mẫu BẮT BUỘC phải nằm trong một trong các thẻ trang in:
     + Khổ A4 Dọc: <PageA4 style="padding: 10mm 15mm;">...</PageA4>
     + Khổ A4 Ngang: <PageA4 :landscape="true" style="padding: 10mm 15mm;">...</PageA4>
     + Khổ A5 Dọc: <PageA5 style="padding: 8mm 12mm;">...</PageA5>
     + Khổ A5 Ngang: <PageA5 :landscape="true" style="padding: 8mm 12mm;">...</PageA5>
   - Tự động nhận diện khổ giấy và hướng in phù hợp từ yêu cầu của người dùng (mặc định A4 dọc nếu không chỉ định).

2. BẮT BUỘC 100% SỬ DỤNG CÁC COMPONENT NHẬP LIỆU CÓ SẴN CỦA HỆ THỐNG:
   TUYỆT ĐỐI KHÔNG dùng dấu chấm thủ công (ví dụ: "Họ và tên: ...................."), gạch dưới tĩnh ("______") hay thẻ <input type="text"> HTML thô. Mọi trường nhập liệu / điền thông tin trên phiếu BẮT BUỘC PHẢI DÙNG đúng các Vue component sau:
   - <Textarea v-model="data.fieldName" label="Tiêu đề:" :line="true" />:
     + DÙNG CHO MỌI trường nhập liệu thông tin dạng văn bản (Họ và tên, Địa chỉ, Nghề nghiệp, Lý do khám, Chẩn đoán, Triệu chứng, Lời dặn của bác sĩ, Ghi chú...).
     + LUÔN CÓ thuộc tính :line="true" để tạo đường kẻ dòng ngầm tự nhiên chuẩn biểu mẫu in ấn.
   - <DatePicker v-model="data.dateField" label="Tiêu đề:" format="DD/MM/YYYY" placeholder="DD/MM/YYYY" />:
     + DÙNG CHO các trường ngày tháng (Ngày sinh, Ngày khám, Ngày cấp thẻ, Ngày chỉ định...).
     + Nếu cần cả giờ phút (ví dụ giờ hẹn tái khám): Thêm mode="datetime" format="HH:mm DD/MM/YYYY".
   - <InputOTP v-model="data.codeField" label="Tiêu đề:" :mask-length="[1,1,1,1]" pad-start="0" />:
     + DÙNG CHO các trường mã số/định danh (Mã bệnh nhân, Số hồ sơ, Mã thẻ BHYT, Tuổi [1,1]...).
   - <Select v-model="data.selectField" label="Tiêu đề:" :items="listName" bind-label="name" bind-value="id" />:
     + DÙNG CHO các trường chọn danh mục (Giới tính, Khoa phòng, Đối tượng chi trả BHYT...).
     + Trong Script BẮT BUỘC phải khai báo mảng danh mục tương ứng (ví dụ: const genderList = [{ id: 'nam', name: 'Nam' }, { id: 'nu', name: 'Nữ' }];) và return ra ngoài.
   - <Checkbox v-model="data.checkField" :native="true" afterText="Văn bản" />:
     + DÙNG CHO các tùy chọn dạng hộp kiểm (Nam / Nữ dạng tích ô vuông, Có BHYT, Tiền sử dị ứng...).
   - <Paint v-model="data.signature" label="Chữ ký:" style="width: 250px; height: 110px;" />:
     + BẮT BUỘC DÙNG cho MỌI vùng chữ ký xác nhận (Chữ ký Bác sĩ điều trị, Chữ ký Bệnh nhân / Thân nhân, Kỹ thuật viên, Người lập phiếu...). Cho phép người dùng ký vẽ trực tiếp.

3. BẢNG DỮ LIỆU DANH MỤC (TABLE):
   - Danh sách thuốc, xét nghiệm, dịch vụ kỹ thuật, viện phí: Dùng thẻ HTML chuẩn có viền nét đơn chuẩn in ấn:
     <table style="width: 100%; border-collapse: collapse; margin: 10px 0;" border="1">
       <thead><tr style="background: #f1f5f9;"><th style="padding: 6px 8px; border: 1px solid #333;">STT</th>...</tr></thead>
       <tbody>...</tbody>
     </table>

4. VUE 3 SCRIPT VÀ CONTEXT CHUẨN XÁC:
   - Khởi tạo: const data = reactive($context.data || {});
   - Trả về đầy đủ dữ liệu mock trong context.data tương ứng với toàn bộ các trường data.xxx được dùng trong template (ví dụ họ tên, chẩn đoán, mã BN, chữ ký...) để mẫu hiển thị đầy đủ và đẹp mắt ngay khi xem trước và in.
   - Khai báo và return đầy đủ các mảng danh mục dùng cho <Select>.

5. TỰ ĐỘNG XỬ LÝ CẢ HAI TÌNH HUỐNG (TẠO MỚI HOẶC SỬA ĐỔI):
   - Nếu có "MÃ TEMPLATE HIỆN TẠI": Bảo tồn nguyên vẹn cấu trúc khổ giấy và các phần không bị yêu cầu thay đổi, chuẩn hóa các trường nhập liệu sang đúng component chuyên dụng.
   - Nếu KHÔNG có template hiện tại: Hãy dựng toàn bộ mẫu biểu chuẩn y tế/hành chính từ đầu với đầy đủ các component có sẵn.

ĐỊNH DẠNG TRẢ VỀ BẮT BUỘC (JSON DUY NHẤT, KHÔNG THÊM BẤT KỲ VĂN BẢN NÀO NGOÀI JSON):
{
  "template": "<PageA4 style=\\"padding: 10mm 15mm;\\">...</PageA4>",
  "script": "const data = reactive($context.data || {});\\nconst genderList = [{ id: 'nam', name: 'Nam' }, { id: 'nu', name: 'Nữ' }];\\nreturn { data, genderList };",
  "context": {
    "data": {
      "fullName": "Nguyễn Văn An",
      "dob": "15/08/1985",
      "patientCode": "BN99281",
      "diagnosis": "Viêm phế quản cấp",
      "signature": ""
    }
  },
  "summary": "Tóm tắt ngắn gọn những gì đã tạo hoặc chỉnh sửa"
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

    const systemPrompt = request.templateType === 'ui' ? this.SYSTEM_PROMPT_UI : this.SYSTEM_PROMPT_DOCUMENT;
    const messages: any[] = [
      { role: 'system', content: systemPrompt }
    ];

    let userContent: any = '';
    if (request.currentTemplate && request.currentTemplate.trim()) {
      userContent += `[CHỈNH SỬA / NÂNG CẤP TRÊN MẪU HIỆN TẠI]\n`;
      userContent += `Yêu cầu của người dùng: ${request.prompt}\n\n`;
      userContent += `--- MÃ TEMPLATE HIỆN TẠI ---\n${request.currentTemplate}\n`;
      if (request.currentScript) {
        userContent += `\n--- MÃ SCRIPT HIỆN TẠI ---\n${request.currentScript}\n`;
      }
      if (request.currentContext) {
        userContent += `\n--- CONTEXT DATA HIỆN TẠI ---\n${typeof request.currentContext === 'string' ? request.currentContext : JSON.stringify(request.currentContext, null, 2)}\n`;
      }
    } else {
      userContent += `[TẠO MẪU MỚI TỪ ĐẦU]\n`;
      userContent += `Yêu cầu thiết kế: ${request.prompt}\n`;
    }

    if (request.templateType === 'document') {
      userContent += `\n[LƯU Ý BẮT BUỘC CHO MẪU PHIẾU / BẢN IN]:\n`;
      userContent += `- Sử dụng 100% các component nhập liệu có sẵn: <Textarea :line="true"> (cho mọi trường họ tên, địa chỉ, chẩn đoán, lời dặn), <DatePicker> (ngày tháng), <InputOTP> (mã số, tuổi), <Select> (danh mục), <Checkbox> (hộp kiểm), <Paint> (chữ ký trực tiếp).\n`;
      userContent += `- Tuyệt đối KHÔNG dùng dấu chấm thủ công (....) hay input HTML thô.\n`;
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

      // Tự động làm sạch modifier nếu có tàn dư [object Object]
      template = template.replace(/\.\[object\s+Object\]/g, '.prevent');

      // Tự động vá Script và Context để bảo đảm template không bị ReferenceError hoặc TypeError
      const healed = this.healScriptAndContext(template, script, context);
      script = healed.script;
      context = healed.context;

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
   * Tự động vá các biến và mảng dữ liệu bị thiếu trong script/context để tránh crash render function
   */
  private static healScriptAndContext(
    template: string,
    script: string,
    context: any
  ): { script: string; context: any } {
    if (!context || typeof context !== 'object') context = { data: {} };
    if (!context.data || typeof context.data !== 'object') context.data = {};

    // 1. Tự động khởi tạo mảng OTP nếu template có binding data.otp
    if (template.includes('data.otp') && !Array.isArray(context.data.otp)) {
      context.data.otp = ['', '', '', '', '', ''];
    }

    // 2. Kiểm tra các biến/hàm giao diện phổ biến nếu template có dùng mà script chưa khai báo
    const commonVars = [
      { name: 'loading', init: 'const loading = ref(false);' },
      { name: 'errorMessage', init: "const errorMessage = ref('');" },
      { name: 'successMessage', init: "const successMessage = ref('');" },
      { name: 'showPassword', init: 'const showPassword = ref(false);' },
      { name: 'togglePassword', init: 'const togglePassword = () => { if (typeof showPassword !== "undefined" && isRef(showPassword)) showPassword.value = !showPassword.value; };' },
      { name: 'handleLogin', init: 'const handleLogin = () => {};' },
      { name: 'forgotPassword', init: 'const forgotPassword = () => {};' },
      { name: 'handleOtpInput', init: 'const handleOtpInput = () => {};' },
      { name: 'handleOtpBackspace', init: 'const handleOtpBackspace = () => {};' },
      { name: 'handleSso', init: 'const handleSso = () => {};' }
    ];

    const injectedInits: string[] = [];
    const injectedReturns: string[] = [];

    for (const item of commonVars) {
      const regexInTemplate = new RegExp(`\\b${item.name}\\b`);
      const regexInScript = new RegExp(`\\b${item.name}\\b`);
      if (regexInTemplate.test(template) && !regexInScript.test(script)) {
        injectedInits.push(item.init);
        injectedReturns.push(item.name);
      }
    }

    if (injectedInits.length > 0) {
      if (script.includes('return {')) {
        script = script.replace(
          /return\s*\{/,
          `${injectedInits.join('\n')}\nreturn {\n  ${injectedReturns.join(', ')},\n`
        );
      } else {
        script += `\n${injectedInits.join('\n')}\nreturn { ${injectedReturns.join(', ')} };`;
      }
    }

    return { script, context };
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

