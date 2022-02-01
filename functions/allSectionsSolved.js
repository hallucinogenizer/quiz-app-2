const { Attempt } = require("../db/models/user");
const { Section } = require("../db/models/quizmodel");

async function allSectionsSolved(quizId, assignment) {
    const sections = await Section.findAll({where:{QuizId: quizId}})
    let all_solved = true
    let count_sections = 0
    return new Promise(async (resolve)=>{
        sections.forEach(async (section)=>{
        const attempt = await Attempt.findOne({where: {AssignmentId: assignment.id, SectionId: section.id}})
        if (attempt==null || attempt.statusText != "Completed") all_solved=false
        count_sections++
        if (count_sections == sections.length) resolve(all_solved)
        })
    })
    
}

module.exports = allSectionsSolved