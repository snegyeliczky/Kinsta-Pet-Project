import User from "../model/User";
import Company from "../model/Company";
import Project from "../model/Project";
import UserStory from "../model/UserStory";
import Task from "../model/Task";

export async function DbInit() {
    await User.query().insertGraph(
        {firstName: "JhonLine", lastName: "Sylvester", email: "SJ@gmail.com", password: "1234"}
    );
    await User.query().insertGraph(
        {firstName: "Jone", lastName: "Wick", email: "JW@gmail.com", password: "4321"}
    );
    await User.relatedQuery('companies')
        .for(1)
        .insert({name: 'Morgen Stanly'});
    await User.relatedQuery('companies')
        .for(1)
        .insert({name: 'JP morgen'});
    await User.relatedQuery('companies')
        .for(2)
        .relate(2);
    await Company.relatedQuery('projects')
        .for(1).insert({name: 'New cash machine system'});
    await Company.relatedQuery('projects')
        .for(1).insert({name: 'Recuiter system for HR'});
    await User.relatedQuery('projects').for(1).relate([1, 2]);
    await User.relatedQuery('participate').for(2).relate(1);
    await User.relatedQuery('participate').for(1).relate(2);
    await User.relatedQuery('participate').for(2).relate(2);
    await Project.relatedQuery('userStories').for(1)
        .insert({userStory: "frontend colors shames", status: false});
    await Project.relatedQuery('userStories').for(1)
        .insert({userStory: "backend db connection", status: false});
    await User.relatedQuery('userStories').for(1)
        .relate(1);
    await User.relatedQuery('userStories').for(2)
        .relate(2);
    let estimation = await User.relatedQuery('userStoryEstimations').for(1).insert({estimation:1});
    await estimation.$relatedQuery('userStory').relate(1);
    let estimation2 = await User.relatedQuery('userStoryEstimations').for(2).insert({estimation:2});
    await estimation2.$relatedQuery('userStory').relate(1);
    await UserStory.relatedQuery('tasks').for(1)
        .insert({title: "creat security", description: "hash password", ready: false});
    await UserStory.relatedQuery('tasks').for(1)
        .insert({title: "creat user model", description: "user have name ", ready: false});
    await Task.relatedQuery('owner').for(1).relate(1)
    await Task.relatedQuery('owner').for(2).relate(2)
}