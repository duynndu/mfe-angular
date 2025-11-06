import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TemplateEditor } from '../../components/template-editor/template-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell-home',
  imports: [FormsModule, TemplateEditor, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home{
  @ViewChild(TemplateEditor) templateEditor!: TemplateEditor;
  template = `<PageA4 style="padding: 3mm 15mm 3mm 15mm;">
  <div>{{ data.name }}</div>
  <p>Tuổi: {{ data.age }}</p>
  <Textarea
    v-model="data.name"
    label="Họ và tên:"
    :line="true"
    :suffix="{ length: 1, char: '❤️' }"
  />
  <Textarea
    v-model="data.age"
    label="Tuổi:"
    :line="true"
  />
  <InputOTP
    v-model="data.age"
    :maskLength="[1,1,1]"
    pad-start="0"
  />

</PageA4>`
  data: any = { name: 'duynnz' }
}
