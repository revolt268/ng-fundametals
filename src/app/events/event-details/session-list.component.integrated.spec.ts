import { Component, DebugElement, Input, NO_ERRORS_SCHEMA, Output } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { CollapsibleWellComponent } from "src/app/common";
import { AuthService } from "src/app/user/auth.service";
import { DurationPipe } from "../shared";
import { SessionListComponent } from "./session-list.component"
import { UpvoteComponent } from "./upvote.component";
import { VoterService } from "./voter.service";

describe("SessionListComponent", () => {

  let mockAuthService,
      mockVoterService,
      fixture: ComponentFixture<SessionListComponent>,
      component: SessionListComponent,
      element: HTMLElement,
      debugEl: DebugElement;

  beforeEach(() => {
    mockAuthService = { isAuthenticated: () => true, currentUser: {userName: 'joe'} };
    mockVoterService = { userHasVoted: () => true};
    TestBed.configureTestingModule({
      declarations:[
        SessionListComponent,
        DurationPipe
        // Adding these changes this test from a shallow test to a deep test
        //  Deep test include the components children and can get pretty
        //  complicated
        //CollapsibleWellComponent,
        //UpvoteComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  })

  describe('initial display', () => {
    it('should have the correct name', () => {
      // Aranged component
      component.sessions = [
        {name: 'Session 1', id: 3, presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob']}
      ]
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;
      component.ngOnChanges();

      // the Action
      fixture.detectChanges();

      //expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
      // using the debug element to do the same as above
      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
    })
  })
})
