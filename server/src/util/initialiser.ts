import User from "../model/User";
import Company from "../model/Company";

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
        .for(2)
        .insert({name: 'JP morgen'});
    await Company.relatedQuery('projects')
        .for(1).insert({name:'New cash machine system'});
    await Company.relatedQuery('projects')
        .for(1).insert({name:'Recuiter system for HR'});
    await User.relatedQuery('projects').for(1).relate([1,2]);
}