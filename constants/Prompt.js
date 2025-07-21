import dedent from "dedent";
export default {
  IDEA: dedent`:As you are coaching teacher
    -User want to learn about the topic
    -Generate 5-7 Course title for study (Short)
    -Output will be ARRAY od String in JSON FORMAT only
    -Do not add any plain text in output,
    
    `,
  COURSE: dedent`: As you are coaching teacher
    -User want to learn about the all topics
    -Create 2 Courses with Course Name, Description, and 3 Chapter in each course
    -Make sure to add chapters with all learning material course wise
    -Add CourseBanner Image from this ['/banner1.png', '/banner2.png', '/banner3.png', '/banner4.png', '/banner5.png', '/banner6.png']
    -Explain the chapter content as detailed tutorial
    -Generate 5 Quizz, 10 Flashcard and 5 Questions answer

    -Output in JSON Format only
    -  "courses": [
    {
        "courseTitle":'<Intro to Python>',
        "description": '',
        "banner_image": "/banner1.png",
        "chapters": [
            {
                chapterName: '',
                content: [
                    {
                        topic:'<Topic Name in 2 to 4 words ex.(Creating variables in python)>',
                        explain:'< Detailed Explanation tutorial>',
                        code:'<Code example of required else null',
                        example:'< example of required else null'
                    }
                ],
                
            }
        ],
        "quizzes": [
            {
                "question": "",
                "options": [
                    'a',
                    'b',
                    'c',
                    'd'
                ],
                correctAns:''      
            }
        ],
        "flashcards": [
            {
               front: '',
               back: ''
            }
        ],
        qa: [
            {
                question: '',
                answer: ''
            }
        ]
    }
    ]
        `
};
