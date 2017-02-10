import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../user/user';
import { UserService } from './../user/user.service';
import { Question } from './question';
import { QuestionService } from './question.service';
import { Category } from './../category/category';
import { CategoryService } from './../category/category.service';
import { Answer } from './../answer/answer';
import { AnswerService } from './../answer/answer.service';

/**
 * Form component to create and edit a questions of a user
 * 
 * @export
 * @class QuestionFormComponent
 */
@Component({
    templateUrl: "app/question/form.component.html"
})
export class QuestionFormComponent implements OnInit {
    
    user      : User;
    question  : Question;
    answer    : Answer;
    categories: Array<Category>;

    @ViewChild('QuestionImage') fileInput: ElementRef;

    constructor(
        private router: Router, 
        private userService: UserService, 
        private questionService: QuestionService,
        private answerService: AnswerService,
        private categoryService: CategoryService
    ) { }

    /**
     * Lifecycle-Hook for initialisation of the component
     * A new question is prepared and filled with the current user.
     * 
     * @memberOf QuestionFormComponent
     */
    public ngOnInit() {
        this.user     = this.userService.getUserFromLocalStorage();
        this.question = new Question();
        this.question.questioner = this.user._links.self.href;
        this.answer   = new Answer();
        
        this.categoryService.getCategories().subscribe(
            categories => this.categories = categories
        );
    }

    /**
     * Add an answer to the question
     * 
     * @memberOf QuestionFormComponent
     */
    public addAnswer() {
        this.question.addAnswer(this.answer);
        this.answer = new Answer();
    }

    /**
     * Submit the currently created/edited question to be saved in the servers database
     * 
     * @memberOf QuestionFormComponent
     */
    public onSubmit() {
        this.questionService.save(this.question).subscribe( // ~~~ 1. Save the question
            (question) => {
                this.question.answersList.forEach((answer, index) => {
                    answer.questionOfAnswer = question._links.self.href; // ~~~ 2. Update the answers with the link to the question resource
                    this.answerService.save(answer).subscribe();         // ~~~ 3. Save the answers 
                });

                let fileInput: HTMLInputElement = this.fileInput.nativeElement; // ~~~ 4. Save the image of the question
                let formData = new FormData();
                    formData.append("image", fileInput.files.item(0));
                this.questionService.saveImage(question._links.image.href, formData).subscribe(questionWithImage => {
                    this.router.navigate(['/question','list']); // ~~~ 5. Navigate to the list of questions
                });
            }
        );
    }

}