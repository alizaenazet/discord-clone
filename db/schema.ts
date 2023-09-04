import { relations, sql } from 'drizzle-orm';
import { datetime, index, mysqlEnum, mysqlTable,text,timestamp, varchar } from 'drizzle-orm/mysql-core';

export const Profile = mysqlTable('profile',{
    // id: varchar('id',{length:36}).default(sql`(UUID_TO_BIN(UUID()))`).unique().primaryKey(),
    id: varchar('id',{length:36}).default(sql`(UUID_TO_BIN(UUID()))`).unique().primaryKey(),
    userId: varchar('user_id',{length:36}).unique(),
    name: varchar('name',{length:200}),
    imageUrl:  text("image_url"),
    email: text("email"),
    createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP()`).notNull(),
    updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP()`).notNull()
    
})

    export const profileRelations = relations(Profile,({many}) => ({
        servers: many(Server),
        members: many(Member),
        channels: many(Channel)

    }))

export const Server = mysqlTable('server',{
    id: varchar('id',{length:36}).default(sql`(UUID_TO_BIN(UUID()))`).unique().primaryKey(),

    name: varchar('name',{length:200}),
    imageUrl:  text("image_url"),
    inviteCode:  text("invite_code"),
    profileId: varchar('profile_id',{length:36}),
    createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP()`).notNull(),
    updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP()`).notNull()
})

    export const serverRelation = relations(Server, ({one,many}) => ({
        owner: one(Profile,{
            fields: [Server.profileId],
            references: [Profile.id]
        }),
        members: many(Member),
        channels: many(Channel)
    }))


export const Member = mysqlTable('member',{
        id: varchar('id',{length:36}).default(sql`(UUID_TO_BIN(UUID()))`).unique().primaryKey(),

    role: mysqlEnum('role',['ADMIN','MODERATOR','GUEST']).default('GUEST'),
    profileId: varchar('profile_id',{length:36}),
    sertverId: varchar('server_id',{length:36}),
    createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP()`).notNull(),
    updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP()`).notNull()
}, (table) => {
    return{
        profileIdIdx: index("profileId_idx").on(table.profileId),
        serverIdIdx: index("serverId_idx").on(table.sertverId)
    }
})

    export const memberRelations = relations(Member, ({one}) => ({
        profile: one(Profile,{
            fields: [Member.profileId],
            references: [Profile.id]
        }),
        server: one(Server,{
            fields: [Member.sertverId],
            references: [Server.id]
        })
    }) ) 


export const Channel = mysqlTable('channel',{
        id: varchar('id',{length:36}).default(sql`(UUID_TO_BIN(UUID()))`).unique().primaryKey(),

    name: varchar('name',{length:200}),
    type: mysqlEnum('type',['TEXT','AUDIO','VIDEO']).default("TEXT"),
    profileId: varchar('profile_id',{length:36}),
    sertverId: varchar('server_id',{length:36}),
    createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP()`).notNull(),
    updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP()`).notNull()
 }, (table) => {
    return {
        profileIdIdx: index("profileId_idx").on(table.profileId),
        serverIdIdx: index("serverId_idx").on(table.sertverId)
    }
 })

    export const channelRelations = relations(Channel, ({one}) => ({
        profile: one(Profile,{
            fields: [Channel.profileId],
            references: [Profile.id]
        }),
        server: one(Server,{
            fields: [Channel.sertverId],
            references: [Server.id]
        })
    }) )