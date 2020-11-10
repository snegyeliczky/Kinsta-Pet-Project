exports.up = knex => {
    return knex.schema

        .createTable('users', table => {
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
        .createTable('projects', table => {
            table.increments('id').primary()

            table
                .integer('companyId')
                .unsigned()
                .references('id')
                .inTable('companies')
                .onDelete('CASCADE')
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
        .createTable('user_stories', table => {
            table.increments('id').primary()

            table
                .integer('userId')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL')
                .index()

            table
                .integer('projectId')
                .unsigned()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .index()

            table.string('userStory')
            table.boolean('status')
            table.integer('businessValue')
        })
        .createTable('user_estimations', table => {
            table.increments('id').primary()

            table.integer('userId')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .index()

            table.integer('user_storyId')
                .unsigned()
                .references('id')
                .inTable('user_stories')
                .onDelete('CASCADE')
                .index()

            table.integer('estimation')
        })
        .createTable('user_projects', table => {
            table.increments('id').primary().unique()

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
        .createTable('tasks', table => {
            table.increments('id').primary()
            table.string('title')
            table.string('description')
            table.boolean('ready')
            table.string('time')

            table
                .integer('user_story_id')
                .unsigned()
                .references('id')
                .inTable('user_stories')
                .onDelete('CASCADE')
                .index()

            table
                .integer('owner_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL')
                .index()
        })
        .createTable('participate_invites', table => {
            table.increments('id').primary()

            table
                .integer('sanderId')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL')
                .index()

            table
                .integer('receiverId')
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
        .dropTableIfExists('user_estimations')
        .dropTableIfExists('tasks')
        .dropTableIfExists('user_stories')
        .dropTableIfExists('participate_invites')
        .dropTableIfExists('projects')
        .dropTableIfExists('companies')
        .dropTableIfExists('users')

};