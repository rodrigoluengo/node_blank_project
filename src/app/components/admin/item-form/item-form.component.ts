import {Component, OnInit} from '@angular/core';
import {SectionService} from "../../../services/section.service";

@Component({
  selector: 'item-form',
  templateUrl: 'item-form.component.html',
  styleUrls: ['item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  sections = [];
  section = null;
  loaded = false;

  item = {};

  constructor(private sectionService: SectionService) { }

  ngOnInit()
  {
    $('#dialogItem').modal({show: false}).on('show.bs.modal', ()=>
    {
      this.show();
    });
  }

  show()
  {
    this.initSection();
  }

  initSection()
  {
    this.sectionService.get({type: ''}).subscribe((sections:Array<any>) =>
    {
      let jstreeSections = [];
      this.sections = sections;

      // Parse Sections to jstree format
      sections.forEach((section) =>
      {
        jstreeSections.push({
          id: section._id,
          text: section.name,
          data: section,
          state: {
            opened: false,
            selected: false
          }
        });
      });

      // Destroy and Initialize jstree
      $('#treeSections').jstree('destroy').jstree({
        core: {
          data: jstreeSections
        }
      });

    },
    (errors) =>
    {

    });

  }

  save()
  {

  }

  close()
  {
    $('#dialogItem').modal('hide');
  }

}
