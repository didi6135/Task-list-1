



const taskComplete = document.getElementById('taskComplete')

const taskContainer = document.getElementById('taskContainer')

let tasks;
let completed;
websiteInit()

// קבלת תאריך מדויק כולל שעה

function getCurrentDateAndTime() {
    let today = new Date();
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
     
    
    return dateTime
}

// tasks.forEach((item, i) => {
//     item = i + 0})



// שאיבת נתונים מהטופס לתוך משתנים

const title = document.getElementById('title')
const erorrTitle = document.getElementById('erorrTitle')

const details = document.getElementById('details')
const erorrDetails = document.getElementById('erorrDetails')

const date = document.getElementById('date')
const erorrDate = document.getElementById('erorrDate')

const time = document.getElementById('time')
const erorrTime = document.getElementById('erorrTime')

const dateTask = getCurrentDateAndTime()



// const taskConplete = completeTheTask()

// פונקצייה לבדיקה האם יש נתונים שמורים ב Local storage

function websiteInit() {
    if (localStorage.getItem('taskList')) {
        let strTasks = localStorage.getItem('taskList')
        tasks = JSON.parse(strTasks)
    } else {
      
        tasks = []
        
    }

    if (localStorage.getItem('completeTask')) {
        let strCompleted = localStorage.getItem('completeTask')
        completed = JSON.parse(strCompleted)
    } else {
      
        completed = []
        
    }
    drowTasks()

}

// מחיקת משימות


 



// בדיקה האם המשתמש החסיר פרטים והוצאת הודעה שגיאה בהתאם 

function validationErorrs(obj) {
    erorrTitle.innerHTML = obj.title? '' : 'Please enter a title';
    erorrDetails.innerHTML = obj.details? '' : 'Please add details';
    erorrDate.innerHTML = obj.date? '' : 'Please add Date';
    erorrTime.innerHTML = obj.time? '' : 'Please add time';
    
    if (!obj.title || !obj.details || !obj.date || !obj.time) {
        
        return false  
    } else {
        return true
    }
}

// פונקציה לניקוי הטופס 

function cleanForm() {
    
    title.value = ""
    details.value = ""
    date.value = ""
    time.value = ""
    
    erorrTitle.innerHTML = ""
    erorrDetails.innerHTML = ""
    erorrDate.innerHTML = ""
    erorrTime.innerHTML = ""

    taskContainer.innerHTML = ""
}

//  קבלת הערכים מהמשתנים

function getFormValues() {

    return {
        id:tasks.length,
        title: title.value,
        details: details.value,
        date: date.value,
        time: time.value,
        today:dateTask,
        completed: false
        
} 


}

// הוספת פריט ל Local storage

function addNewTaskToLocalStorage(task) {
    tasks.push(task)
    const stringfyTask = JSON.stringify(tasks)
    localStorage.setItem('taskList' , stringfyTask)
}

// הוספת משימה למשימות שהושלמו ב local storage

function addNewCompletedTaskToLocalStorage(taskCompleted) {
        completed.push(taskCompleted)
        const stringfyTask = JSON.stringify(completed)
        localStorage.setItem('completeTask' , stringfyTask)
        drawCompletedTask()

}

// הוספת משימה חדשה

function addNewTask() {
    const newTask = getFormValues()
    const validation = validationErorrs(newTask)
    
    if (validation) { 
        cleanForm()
        addNewTaskToLocalStorage(newTask)
        websiteInit()
        
    }
}

// הדפסת משימות שהושלמו

function drawCompletedTask() {

    taskComplete.innerHTML = '' 
  
    let strCompleted = localStorage.getItem('completeTask')
    completed = JSON.parse(strCompleted)
    // console.log(completed)
        if(completed.length === 0) {
            alert('You have no completed tasks!')
        }


        completed.forEach((todo, num) =>  {
            
                const cardTask = document.createElement('li')
         
                
                const currentDate = document.createElement('h6')
                const cardTitle = document.createElement ('h2')
                const cardDetails = document.createElement ('h4')
                const cardDate = document.createElement ('h6')


                
                cardTitle.innerHTML = todo.title
                cardDetails.innerHTML = todo.details
                cardDate.innerHTML ='Due date: ' + todo.date + ' at: ' + todo.time
                currentDate.innerHTML ='created: ' + todo.today

        
                // כפתור מחיקה
                const buttenDelete = document.createElement('button')
                buttenDelete.innerHTML ='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg>' 
                buttenDelete.addEventListener('click', function()  {
                   
                    deleteTaskCompleted(num)
                }) 
        
                // כפתור להחזיר את המשימה 
                const buttenNotComplete = document.createElement('button')
                buttenNotComplete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/> <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/> </svg>'  
                buttenNotComplete.addEventListener('click', function()  {
    
                    notCompleteTask(todo, num)
                    
                }) 
        
        
                
                cardTask.appendChild(buttenDelete)
                cardTask.appendChild(buttenNotComplete)
                cardTask.appendChild(currentDate)
                cardTask.appendChild(cardTitle)
                cardTask.appendChild(cardDetails)
                cardTask.appendChild(cardDate)
                
                
        
                taskComplete.appendChild(cardTask)
           
            
            
        }) 
           

           
}





//הדפסת משימה חדשה 

function drowTasks() {
    
            tasks.forEach((todo, num) => {
                if(todo.completed === false) {
        
                const cardTask = document.createElement('li')
             
                
                const currentDate = document.createElement('h6')
                const cardTitle = document.createElement ('h2')
                const cardDetails = document.createElement ('h4')
                const cardDate = document.createElement ('h6')
        
        // כפתור מחיקה
                const buttenDelete = document.createElement('p')
                buttenDelete.innerHTML ='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg>' 
                buttenDelete.addEventListener('click', function()  {
                   
                    deleteTaskTest(num)
                }) 
        
        // כפתור עריכה
                const buttenEdit = document.createElement('p')
                buttenEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/> </svg>'
                
                buttenEdit.addEventListener('click', function()  {
                   
                }) 
        
        // כפתור השלמת משימה
                const buttenComplete = document.createElement('p')
                buttenComplete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16"> <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/> <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/> </svg>'  
                buttenComplete.addEventListener('click', function()  {
                    addNewCompletedTaskToLocalStorage(todo)
                    deleteTaskTest(num)
                    
                }) 
                
                cardTitle.innerHTML = todo.title
                cardDetails.innerHTML = todo.details
                cardDate.innerHTML ='Due date: ' + todo.date + ' at: ' + todo.time
                currentDate.innerHTML ='created: ' + todo.today
        
                
                
                cardTask.appendChild(buttenComplete)
                cardTask.appendChild(currentDate)
                cardTask.appendChild(cardTitle)
                cardTask.appendChild(cardDetails)
                cardTask.appendChild(buttenEdit)
                cardTask.appendChild(cardDate)
                cardTask.appendChild(buttenDelete)

        
                taskContainer.appendChild(cardTask)
        
            }
            })
        }     

    
   // מחיקת משימה שהושלמה

 function deleteTaskCompleted(deleteId) {

    completed.splice(deleteId, 1)
    localStorage.setItem('completeTask', JSON.stringify(completed))
    taskComplete.innerHTML = ''
    
    drawCompletedTask()

} 


// מחיקת משימה שלא הושלמה

 function deleteTaskTest(deleteId) {

    tasks.splice(deleteId, 1)
    localStorage.setItem('taskList', JSON.stringify(tasks))
    taskContainer.innerHTML = ''
    drowTasks(tasks)

} 

// החזרת משימה מהושלמה ללא הושלמה

function notCompleteTask(reverseTask, num) {
    tasks.push(reverseTask)
    const stringfyTask = JSON.stringify(tasks)
    localStorage.setItem('taskList' , stringfyTask)
    
    completed.splice(num, 1)
    localStorage.setItem('completeTask', JSON.stringify(completed))
    taskContainer.innerHTML = ''
    taskComplete.innerHTML = ''
    drowTasks()
    drawCompletedTask()
    
}



  // עריכת משימה


function editTasks() {

}

















