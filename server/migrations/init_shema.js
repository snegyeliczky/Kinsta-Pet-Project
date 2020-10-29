exports.up = knex =>{
    return knex.schema

        .createTable('users', table =>{
            table.increments('id').primary();

            table.string('firstName');
            table.string('lastName');
            table.string('password');
            table.string('email');
            table.json('address');
        })
        .createTable('companies', table => {
            table.increments('id').primary();
            table.string('name')
        })
        .createTable('users_company', table => {
            table.increments('id').primary()

            table
                .integer('userId')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .index()

            table
                .integer('companyId')
                .unsigned()
                .references('id')
                .inTable('companies')
                .onDelete('CASCADE')
                .index()
        })
        .createTable('projects',table =>{
            table.increments('id').primary()

            table
                .integer('companyId')
                .unsigned()
                .references('id')
                .inTable('companies')
                .onDelete('SET NULL')
                .index()

            table
                .integer('ownerId')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL')
                .index()

            table.string('name')
         })
        .createTable('user_projects', table => {
            table.increments('id').primary()

            table
                .integer('userId')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .index()

            table
                .integer('projectId')
                .unsigned()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .index()
        })
};

exports.down = knex => {
    return knex.schema
        .dropTableIfExists('users_company')
        .dropTableIfExists('user_projects')
        .dropTableIfExists('projects')
        .dropTableIfExists('companies')
        .dropTableIfExists('users')

};