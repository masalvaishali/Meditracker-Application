import { AgentsService } from './../../../service/agent.service';
import { Component, OnInit } from '@angular/core';
import { Agents } from 'src/app/model/agents_model';

@Component({
  selector: 'app-manageagent',
  templateUrl: './manageagent.component.html',
  styleUrls: ['./manageagent.component.css']
})
export class ManageagentComponent implements OnInit {

  agents: Agents[] = [];
  constructor(private agentsService: AgentsService) { }

  ngOnInit() {
    this.agentsService.getAllAgentUrl().subscribe((res: Agents[]) => {
      this.agents = res;
    })
  }

}
