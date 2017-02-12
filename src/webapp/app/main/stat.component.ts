import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Category } from './../category/category';
import { CategoryService } from './../category/category.service';
import { Result } from './../result/result';
import { ResultService } from './../result/result.service';
import { User } from './../user/user';
import { UserService } from './../user/user.service';
import { MessageService } from './../misc/message.service';

/**
 * Statistical component to show the skill of the current user
 * 
 * @export
 * @class StatComponent
 */
@Component({
  templateUrl: 'app/main/stat.component.html'
})
export class StatComponent implements OnInit {

    user : User;
    stats: Array<any> = [];

    constructor(
        public categoryService: CategoryService,
        public resultService: ResultService,
        public userService: UserService
    ) {  }

    /**
     * Lifecycle-Hook for initialisation of the component
     * The current stats of the current user are obtained from the server by category
     * 
     * @memberOf StatComponent
     */
    public ngOnInit() {
        this.user = this.userService.getUserFromLocalStorage();
        this.categoryService.getCategories().subscribe(categories => {
            categories.forEach(category => {
                let index = this.stats.push({name: category.name, user: 0, mean: 0}) - 1;
                Observable.combineLatest(
                    this.resultService.countByCategoryAndUser(category), 
                    this.resultService.countCorrectByCategoryAndUser(category),
                    this.resultService.countByCategory(category),
                    this.resultService.countCorrectByCategory(category)
                ).subscribe( counts => {
                    this.stats[index] = {
                        name: category.name, 
                        user: counts[1] / counts[0],
                        mean: counts[3] / counts[2]
                    };
                });
            });
        });
    }

}