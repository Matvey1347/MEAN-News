import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { Feedback } from 'src/app/shared/types/intefaces/feedback.interface';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.scss']
})
export class FeedbackViewComponent implements OnInit {
  feedback$: Observable<Feedback[]>;

  constructor(private feedbackService: FeedbackService) { 
    this.feedback$ = feedbackService.getAll();
  }

  ngOnInit(): void {
  }

}
