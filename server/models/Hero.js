const mongoose = require('mongoose')

// 该文件就是在我们的MongoDB数据库中创建了一张Category表，new一个Schema指定该表中的字段和类型
const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    // 英雄分类
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    // 英雄评分
    scores: {
        // 操作难度
        difficult: { type: Number },
        // 技能
        skills: { type: Number },
        // 攻击
        attack: { type: Number },
        // 生存
        survive: { type: Number },
    },
    // 技能
    skills: [{
        // 图标
        icon: { type: String },
        // 技能名称
        name: { type: String },
        // 技能说明
        description: { type: String },
        // 技能提示
        tips: { type: String }
    }],
    // 推荐装备
    items1: {
        item: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
        tips: { type: String }
    },
    items2: {
        item: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
        tips: { type: String }
    },
    // 使用技巧
    usageIips: { type: String },
    // 对抗技巧
    battleIips: { type: String },
    // 团战思路
    teamIips: { type: String },
    // 英雄搭档
    heroFriends: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }],


})

module.exports = mongoose.model('Hero', schema)