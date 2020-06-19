import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';


@Component({
  providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => CustomToolComponent) }],
  selector: 'app-custom-tool',
  template: `
      <ng-template #toolbarTemplate>
          {{ text }}
      </ng-template>
  `
})
export class CustomToolComponent extends ToolBarToolComponent {
  public tabindex = -1;

  @Input() public text: string;

  @ViewChild('toolbarTemplate', { }) public toolbarTemplate: TemplateRef<any>;

  constructor() {
      super();
  }
}
