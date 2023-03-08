const DisplaysidebarContent = document.querySelector('#sidebar');
const sidebarContent = document.querySelector('.menu');
const closeBtn = document.querySelector('#closeBtn');
const BudgetcloseBtn = document.querySelector('#budgetcloseBtn');
const editcloseBtn = document.querySelector('#editcloseBtn');
const popup = document.querySelector('#Addpopup');
const popupContent = document.querySelector('#popupContent');
const AddBtn = document.querySelector('#AddBtn');
const AddExpenseInput = document.querySelector('#expenseIn');
const AddExpenseAmount = document.querySelector('#amount');
const ExpenseDate = document.querySelector('#expenseDate');
const AddpopupOkbtn = document.querySelector('#AddpopupBtn');
const ExpenseCat = document.querySelector('#ExpenseCat');
const TodayExpense = document.querySelector('#TodayExp');
const MonthlyExpense = document.querySelector('#MonthExp');
const WeeklyExpense = document.querySelector('#WeekExp');
const DailyMonthlyExpense = document.querySelector('#DailyExp');
const DetailedReportOfExpense = document.querySelector('#Details');
const setbudget = document.querySelector('#SetBudget');
const ExpenseType = document.querySelector('#ExpenseType');
const ExpenseTypeconts = document.querySelector('#ExpenseTypeconts');
const view = document.querySelector('#ViewType');
const viewTypeconts = document.querySelector('#ViewTypeconts');
const budgetOfMonth = document.querySelector('#budgetOfMon');
const balanceLeft = document.querySelector('#balance');
const Homebtn = document.querySelector("#HomeBtn");
const ExpenseTypeBtn = document.querySelector('#ExpenseTypeBtn');
const typeCat = document.querySelector('#typeCat');
const OkBtn = document.querySelector('#ExpenseTypeSubmissionBtn');
const BackBtn = document.querySelector('#TypeBackBtn');
const typemonth = document.querySelector('#typemonth');
const typeweek = document.querySelector('#typeweek');
const typeDate = document.querySelector('#typeDate');
const submitbtn = document.querySelector('#TypeSubmissionBtn');
const graphViewerBtn = document.querySelector('#graphViewer');
const displayGraphpopup = document.querySelector('#displayGraphpopup')
const displayGraphpopupContent = document.querySelector('#displayGraphpopupContent')
const graphcloser = document.querySelector("#GraphcloseBtn");
const EditBudget = document.querySelector("#EditBudget");
const budgetpopup = document.querySelector('#budgetpopup');
const budgetpopupContent = document.querySelector('#budgetpopupContent');
const budgetpopupBtn = document.querySelector('#budgetpopupBtn');
const expensemonth = document.querySelector('#expensemonth');
const bamount = document.querySelector('#bamount');
const budgetcloseBtn = document.querySelector('#budgetcloseBtn');
const fltbtn = document.querySelector("#fltbtn");
const cost = document.querySelector("#td_detail");
const thisday = document.querySelector('#this_day');
const thisweek = document.querySelector('#this_week');
const thismonth = document.querySelector('#this_month');
//////////////////////////////////////
var Is_expanse_set;
var flag = true;
var dateflag = true;
var objid = 0;
var explastId = 0;
var budgetId = 0;
var budid = 0;
var currentdate = '';
var currentMonth = '';
var currentWeekNumber = 0;
var enteredmonth = '';
var Displaygraph = 0;
var deletebtnarray
var editbtnarray
var viewbtnarray
var editoptionarray
//<----------------------------- general function used----------------------------------------------->
/////////////////////////////////////////  function to find week number//////////////////////////
function getWeek(year, month, date) {
    var onejan = new Date(year, 0, 1);
    var today = new Date(year, month, date);
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.round(dayOfYear / 7)
};
///////////// function for amount validation //////////////////////////////////////////////////////
function AmountValidation(Amount) {
    if (!Number.isInteger(parseInt(Amount)) || Amount <= 0) {
        alert('Please enter a valid amount');
        return false;
    } else {
        return true;
    }
}
//<----------------------------- id updating fun---------------------------------------------->
//////////////// function to update expense  id ////////////////////////////////////////////////////////////
function updateid() {
    objid++;
    explastId = objid;
    localStorage.setItem('explastId', JSON.stringify(explastId));
}
//////////////// function to update budget id /////////////////////////////////////////////////////
function Budgetidupdate() {
    budid++;
    budgetId = budid;
    localStorage.setItem('budgetId', JSON.stringify(budgetId));
}
//<--------------------------id updating fun end---------------------------------------------->
///////////// function find current date //////////////////////////////////////////////////////////
function findcurrentdate() {
    const now = new Date();
    const year = now.getFullYear();
    /* the padStart method to add leading zeros to the month and date values if they are less than 10.  */
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    currentdate = `${year}-${month}-${date}`;
    currentMonth = month;
}
///////////////////////////////////// event listener//////////////////////////////////////////////
window.addEventListener('load', function () {
    findcurrentdate();
    restbudget();
    displayFromlocalStorage();
    resetInputFields();
    Homebtn.addEventListener("click", function () {
        window.location.reload();
    })
    //////////////////// id checking and budget set checking////////////////////////
    objid = JSON.parse(localStorage.getItem('explastId') || 0);
    budid = JSON.parse(localStorage.getItem('budgetId') || 0);
    Is_expanse_set = (localStorage.getItem('Is_budget_set') || false);
    displaybudgetbtn();
});
/////////////////////////////// to display/return the menu //////////////////////////////////////////
function removesidebar() {
    sidebarContent.classList.toggle('active');
    DisplaysidebarContent.classList.toggle('active');
}
//<----------------------------- general function used end---------------------------------------------->
////////to display the menu items/////////////////////////////
DisplaysidebarContent.addEventListener('click', function (e) {
    removesidebar();
})
/////////// Addpopup close btn  event listener//////////////////////////////////////////////////////
closeBtn.addEventListener('click', function (e) {
    popup.classList.remove('active');
    popupContent.classList.remove('active');
});
///////////////////////////// addpopup btn event listener////////////////////////////////////
AddBtn.addEventListener('click', function () {
    popup.classList.add('active');
    popupContent.classList.add('active');
});
///////////////////////////// addpopup ok btn event listener////////////////////////////////////
AddpopupOkbtn.addEventListener('click', function () {
    var expenseInput = AddExpenseInput.value;
    var expenseAmount = AddExpenseAmount.value;
    var expenseDate = ExpenseDate.value;
    var expenseCategory = ExpenseCat.value;
    if (!expenseInput || !expenseAmount) {
        alert('Please fill all the fields ');
        return;
    }
    if (!AmountValidation(expenseAmount)) {
        return;
    }
    const checkDate = checkEnterdDate(expenseDate, expenseCategory);
    const haveBudgetSet = localStorage.getItem('Is_budget_set');

    if (checkDate) {
        const weekArr = expenseDate.split('-', 3);
        const enteredMonth = weekArr[1];
        if (enteredMonth == currentMonth && weekArr[0] == new Date().getFullYear() && haveBudgetSet == 'true') {
            const isUnderBudget = parseInt(TotalExpenseOfmonth(weekArr[1], weekArr[0])) + parseInt(expenseAmount);
            const assignedBudget = parseInt(checkIsUnderBudget(weekArr[1], weekArr[0]));
            if (isUnderBudget < assignedBudget) {
                addItem();
            } else {
                alert('You have met your budget');
                resetInputFields()
            }
        } else {
            addItem();
        }
    }
    function addItem() {
        const weekArr = expenseDate.split('-', 3);
        const enteredMonth = weekArr[1];
        const currentWeekNumber = getWeek(weekArr[0], weekArr[1] - 1, weekArr[2]);
        AddtolocacalStorage(expenseInput, expenseAmount, expenseDate, objid, enteredMonth, weekArr[0], expenseCategory, currentWeekNumber);
        restbudget();
        updateid();
        resetInputFields();
    }
});
/////////////////////////////restore back the addpopup//////////////////////////////////
function resetInputFields() {
    ExpenseDate.value = currentdate;
    ExpenseCat.value = 'SelectCategory';
    AddExpenseInput.value = '';
    AddExpenseAmount.value = '';
    popup.classList.remove('active');
    popupContent.classList.remove('active');
}
///////////// function to check Entered dDate ///////////////////////////////////////////////////  
function checkEnterdDate(Endate, Ecategory) {
    if (Endate == '' || Ecategory == 'SelectCategory') {
        alert(' Please fill all the fields from the form correctly');
    }
    else if ((Endate == currentdate || new Date(currentdate).getTime() > new Date(Endate).getTime()) && (Ecategory != 'SelectCategory')) {
        return true;
    }
}
//<---------------- function To manipuilate the gives data(del,view,edit)---------------------------->
function addcontrolbtns() {
    deletebtnarray = document.querySelectorAll('.deletebtn');
    editbtnarray = document.querySelectorAll('.editbtn');
    viewbtnarray = document.querySelectorAll('.viewbtn');
    editoptionarray = document.querySelectorAll('.editoption');
    ////////////////////////delete option(Data manipulation btn(delete))//////////////////////////
    deletebtnarray.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            const parent = e.target.parentElement.parentElement.parentElement.id;
            e.target.parentElement.parentElement.parentElement.remove();
            deletefromlocalstorage(parent);
        })
    });
    ////////////////////////edit option(Data manipulation btn(edit))//////////////////////////
    editbtnarray.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            const parent = e.target.parentElement.parentElement.parentElement.id;
            initiateEdit(parent)
        })
    });
    /////////////////edit option(Data manipulation btn(edit,del,view)) //////////////////////////    
    editoptionarray.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            const parent = e.target.parentElement.parentElement.id;
            document.querySelectorAll('.action').forEach(function (action_btn) {
                if (action_btn.parentElement.parentElement.parentElement.id == parent) {
                    action_btn.classList.toggle('active');
                }
            })
        })
    })

    document.querySelectorAll('.Expense').forEach(function (expense) {
        expense.addEventListener('click', function (e) {
            viewfromlocalstorage(e.target.id);
        })
    })
}
//////////////////////////////////// initiate edit /////////////////////////////////////////////
function initiateEdit(id) {
    const editpopup = document.querySelector('#editpopup');
    const editpopupContent = document.querySelector('#editpopupContent');
    const editcloseBtn = document.querySelector('#editcloseBtn');
    const editbtn = document.querySelector('#editpopupBtn');
    const EditExpenseInput = document.querySelector('#EexpenseIn');
    const EditExpenseAmount = document.querySelector('#Eamount');
    const EditExpenseDate = document.querySelector('#editexpenseDate');
    const EditExpenseCat = document.querySelector('#editExpenseCat');
    let isEdited = false;
    editpopup.classList.toggle('active');
    editpopupContent.classList.toggle('active');
    /////////////// to close the edit popup ////////////////////////////////////////////////////////    
    editcloseBtn.addEventListener('click', function () {
        editpopup.classList.toggle('active');
        editpopupContent.classList.toggle('active');
    });
    /////////////// to edit the expense// ////////////////////////////////////////////////////////    
    editbtn.addEventListener('click', function () {
        if (EditExpenseInput.value === '' || EditExpenseAmount.value === '' || EditExpenseDate.value === '' || EditExpenseCat.value === 'SelectCategory') {
            alert('Please fill all the fields');
        } else {
            if (AmountValidation(EditExpenseAmount.value) === true) {
                if (checkEnterdDate(EditExpenseDate.value, EditExpenseCat.value) === true) {
                    let text = EditExpenseDate.value;
                    const weekarr = text.split("-", 3);
                    let WeekNumber = getWeek(weekarr[0], weekarr[1] - 1, weekarr[2]);
                    let Enteredmonth = weekarr[1];
                    editfromlocalstorage(EditExpenseInput.value, EditExpenseAmount.value, EditExpenseDate.value, EditExpenseCat.value, id, WeekNumber, Enteredmonth, weekarr[0]);
                    isEdited = true;
                    alert("Expense edited successfully");
                    editpopup.classList.toggle('active');
                    editpopupContent.classList.toggle('active');
                    restbudget();
                }
            }
        }
    });
}
//<------------------------------- local storage functions ------------------------------------------>
///// function addto local storage//////////////////////////////////////////////////////////////
function AddtolocacalStorage(Description, amount, date, id, month, year, category, week) {
    let expense = {
        expense: Description.toLowerCase(),
        amount: amount,
        date: date,
        id: id,
        month: month,
        year: year,
        category: category,
        week: week
    }

    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.push(expense);
    localStorage.setItem('expenseList', JSON.stringify(expenseList));
    displayFromlocalStorage();
}
///////////// function to display the expense list from local storage /////////////////////////
function displayFromlocalStorage() {
    TodayExpense.innerHTML = '<div class="ExpenseListHeading row">Todays Expense</div>';
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.date == currentdate) {
            let li = document.createElement('div');
            li.classList.add('Expense');
            li.innerHTML = `
            <div class="paid">${expense.expense}</div>
            <div>Rs:${expense.amount}</div>
            <div>${expense.date}</div>
           <div class=actioncontainer><div class="editoption">...</div>
           <div class="actionbtncontainer"><img src="images/delete.webp" alt="delete" class="action deletebtn"><img src="images/edit.webp" alt="edit"  class="action editbtn"></div>`;
            TodayExpense.appendChild(li);
            li.setAttribute('id', expense.id);
        }
    })
    addcontrolbtns();
}
////////////////////////////////////editlocalstorage function //////////////////////////////////
function editfromlocalstorage(Description, Amount, date, category, Id, week, month, year) {
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    for (let i = 0; i < expenseList.length; i++) {
        if (expenseList[i].id == Id) {
            expenseList[i].expense = Description;
            expenseList[i].amount = Amount;
            expenseList[i].date = date;
            expenseList[i].category = category;
            expenseList[i].id = Id;
            expenseList[i].week = week;
            expenseList[i].month = month;
            expenseList[i].year = year;
        }
    }
    localStorage.setItem('expenseList', JSON.stringify(expenseList));
    displayFromlocalStorage();
}
///////////////////////// delete from local storage ///////////////////////////////////////////
function deletefromlocalstorage(id) {
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    for (let i = 0; i < expenseList.length; i++) {
        if (expenseList[i].id == id) {
            expenseList.splice(i, 1);
            break;
        }
    }
    restbudget();
    localStorage.setItem('expenseList', JSON.stringify(expenseList));
}
//<------------------------------- local storage functions end--------------------------------------->
/////////////////////////////createStructure function //////////////////////////////////////////
function createstructure(expense, where_to_add) {
    let li = document.createElement('div');
    li.classList.add('Expense');
    li.innerHTML = `
    <div class="paid">${expense.expense}</div>
    <div>Rs:${expense.amount}</div>
    <div>${expense.date}</div>
    <div class=actioncontainer><div class="editoption">...</div>
    <div class="actionbtncontainer"><img src="images/delete.webp" alt="delete" class="action deletebtn"><img src="images/edit.webp" alt="edit"  class="action editbtn"></div>`
    li.setAttribute('id', expense.id);
    MonthlyExpense.style.display = "none";
    WeeklyExpense.style.display = "none";
    TodayExpense.style.display = "none";
    DailyMonthlyExpense.style.display = "none";
    where_to_add.appendChild(li);
    where_to_add.style.display = "block";
}
///////////////////////// display daily expenses function /////////////////////////////////////
function displayMonthlyExpenses(month, year) {
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
    MonthlyExpense.innerHTML = `<div class="ExpenseListHeading row">${monthName} Expense</div>`
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.month == month && expense.year == year) {
            createstructure(expense, MonthlyExpense);
        }
    })
    addcontrolbtns();
}
///////////////////////// display daily expenses function ////////////////////////////////////
function displayweeklyExpenses(week, year) {
    const day = new Date(year, 0, 1 + (week) * 7);
    /// get month name from date
    const monthName = day.toLocaleString('default', { month: 'long' });
    const weekNumber = getWeekOfMonth(day);
    WeeklyExpense.innerHTML = `<div class="ExpenseListHeading row">${monthName} Week ${weekNumber} Expense</div>`
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.week == week && expense.year == year) {
            createstructure(expense, WeeklyExpense);
        }
    })
    addcontrolbtns();
}
///////////////////////// display daily expenses function ////////////////////////////////////
function DisplayDailyExpenses(date) {
    DailyMonthlyExpense.innerHTML = `<div class="ExpenseListHeading row">${date} Expense</div>`
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.date === date) {
            createstructure(expense, DailyMonthlyExpense);
        }
    })
    addcontrolbtns();
}

OkBtn.addEventListener('click', function () {
    /// create a key value pair 
    let typeKeyvaluepairarray = {
        typeDate: 'Daily Expense',
        typemonth: 'Monthly Expense',
        typeweek: 'Weekly Expense'
    }
    if (typeCat.value === 'Select Expense detail type') {
        alert('Please Select Category');
    } else {
        BackBtn.classList.add('active');
        OkBtn.style.display = 'none';
        submitbtn.classList.add('active');
        typeCat.style.display = 'none';

        Object.keys(typeKeyvaluepairarray).forEach(function (key) {
            const input = document.getElementById(key);
            if (typeCat.value === typeKeyvaluepairarray[key]) {
                input.classList.add('active');
            } else {
                input.classList.remove('active');
            }
        });
    }
})
function restoreBack() {
    ExpenseType.classList.remove('active');
    ExpenseTypeconts.classList.remove('active');
    BackBtn.classList.remove('active');
    submitbtn.classList.remove('active');
    close();
}
BackBtn.addEventListener('click', function () {
    close();
})

function close() {
    OkBtn.style.display = 'flex';
    BackBtn.classList.remove('active');
    submitbtn.classList.remove('active');
    typeCat.style.display = 'flex';
    typeCat.value = 'Select Expense detail type';
    typeDate.value = '';
    typemonth.value = '';
    typeweek.value = '';
    typemonth.classList.remove('active');
    typeweek.classList.remove('active');
    typeDate.classList.remove('active');
}

ExpenseTypeBtn.addEventListener('click', function () {
    ExpenseType.classList.remove('active');
    ExpenseTypeconts.classList.remove('active');
    close();
});

DetailedReportOfExpense.addEventListener('click', function () {
    ExpenseType.classList.add('active');
    ExpenseTypeconts.classList.add('active');
    removesidebar();
})

function viewfromlocalstorage(displayid) {
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.id == displayid) {
            const discrt = document.querySelector('#vdis');
            const amt = document.querySelector('#vamt');
            const dte = document.querySelector('#vdate');
            const cat = document.querySelector('#vcat');
            discrt.innerHTML = "Discription : " + expense.expense
            amt.innerHTML = "Amount: " + expense.amount
            dte.innerHTML = "Date: " + expense.date
            cat.innerHTML = "Categeory:" + expense.category
            view.classList.add('active');
            viewTypeconts.classList.add('active');
        }
        const viewokbtn = document.querySelector('#vclsbtn');
        const viewclsBtn = document.querySelector('#viewclsBtn');
        viewokbtn.addEventListener('click', function () {
            view.classList.remove('active');
            viewTypeconts.classList.remove('active');
        })
        viewclsBtn.addEventListener('click', function () {
            view.classList.remove('active');
            viewTypeconts.classList.remove('active');

        })
    })
}
////////////////////////////////////////// graph begins /////////////////////////////////
graphViewerBtn.addEventListener("click", function () {
    Displaygraph = 1;
    ExpenseType.classList.add('active');
    ExpenseTypeconts.classList.add('active');
});

submitbtn.addEventListener('click', function () {
    OpenDetailedPopup();
})
////////// function to open detailed popup and to view graph //////////////////////////
function OpenDetailedPopup() {
    let text;
    let input;
    if (typeCat.value === 'Monthly Expense') {
        if (typemonth.value === '') {
            alert('Please Select Month');
        } else {
            text = typemonth.value;
            input = text.split("-", 2);
            if (checkGraphReady() === 0) {
                displayMonthlyExpenses(input[1], input[0]);
                Displaygraph = 0;
                restoreBack()
            }
            else {
                checkGraphReady();
            }
            typemonth.classList.remove('active');
        }
    } else if (typeCat.value === 'Weekly Expense') {
        if (typeweek.value === '') {
            alert('Please Select Week');
        } else {
            text = typeweek.value;
            input = text.split("-W", 2);
            if (checkGraphReady() === 0) {
                displayweeklyExpenses(input[1], input[0]);
                Displaygraph = 0;
                restoreBack()
            }
            else {
                checkGraphReady();
            }
            typeweek.classList.remove('active');
        }
    } else if (typeCat.value === 'Daily Expense') {
        if (typeDate.value === '') {
            alert('Please Select Date');
        } else {
            if (checkGraphReady() === 0) {
                DisplayDailyExpenses(typeDate.value);
                Displaygraph = 0;
                restoreBack()
            }
            else {
                checkGraphReady();
            }
            typeDate.classList.remove('active');
        }
    }
    function checkGraphReady() {
        if (Displaygraph == 1) {
            viewgraphs();
            Displaygraph = 0;
            return 1;
        }
        else {
            return 0;
        }
    }
    // ------------------------viewgraphs()--------------------------------------;   
    function viewgraphs() {
        displayGraphpopup.classList.add('active');
        displayGraphpopupContent.classList.add('active');
        anychart.onDocumentReady(function () {
            let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
            // AN object OF EXPENSES  to store all expenses of a particular month
            let expenseArray = {
                'Home Expense': 0,
                'Transportation Expense': 0,
                'Food Expense': 0,
                'lend': 0,
                ' borrow': 0,
                'HealthCare Expense': 0,
                'PetCare Expense': 0,
                'Entertainment Expense': 0,
                'Child-related expenses': 0,
                'Others': 0
            };
            /*here expenseArray[expense.categeory], here expense.categeory act as index of array for each index the value gets added up for that array element  */
            expenseList.forEach(function (expense) {
                switch (typeCat.value) {
                    case 'Monthly Expense':
                        if (expense.month == input[1] && expense.year == input[0]) {
                            expenseArray[expense.category] += parseInt(expense.amount);
                        }
                        break;
                    case 'Weekly Expense':
                        if (expense.week == input[1] && expense.year == input[0]) {
                            expenseArray[expense.category] += parseInt(expense.amount);
                        }
                        break;
                    case 'Daily Expense':
                        if (expense.date == typeDate.value) {
                            expenseArray[expense.category] += parseInt(expense.amount);
                        }
                        break;
                }
            })
            // set the data
            var data = [
                { x: "Home Expense", value: expenseArray['Home Expense'] },
                { x: "Transportation Expense", value: expenseArray['Transportation Expense'] },
                { x: "Food Expense", value: expenseArray['Food Expense'] },
                { x: "Lend", value: expenseArray['lend'] },
                { x: "Borrow", value: expenseArray[' borrow'] },
                { x: "Health Care Expense", value: expenseArray['HealthCare Expense'] },
                { x: "PetCare Expense", value: expenseArray['PetCare Expense'] },
                { x: "Entertainment Expense", value: expenseArray['Entertainment Expense'] },
                { x: "Child Expense", value: expenseArray['Child-related expenses'] },
                { x: "Other Expense", value: expenseArray['Others'] }
            ];
            // create the chart
            var chart = anychart.pie();
            // set the chart title
            chart.title("Expense graphical analysis");
            // add the data
            chart.data(data);
            // display the chart in the container
            chart.container('container');
            chart.draw();
            restoreBack()
        });
    }
}
///////////////////////// close graph popup js////////////////////////////////////////
graphcloser.addEventListener("click", function () {
    displayGraphpopup.classList.remove('active');
    displayGraphpopupContent.classList.remove('active');
    location.reload();
})
//<!------------------------- budget js-------------------------------------------------->
////////////////// budget set btn Eventlistener///////////////////////////////////////
setbudget.addEventListener("click", function () {
    if (localStorage.getItem('Is_budget_set') == "true") {
        alert("budget for this month is set");
    }
    else {
        budgetpopup.classList.add('active');
        budgetpopupContent.classList.add('active');
        budgetpopupBtn.addEventListener("click", function () {
            budgetManagement();
        })
    }
    restbudget();
})
///////////////////////////// close budget set/display ///////////////////////////////
budgetcloseBtn.addEventListener("click", function () {
    budgetpopup.classList.remove('active');
    budgetpopupContent.classList.remove('active');
})
///////////////////// Edit budget btn eventlistner ///////////////////////////////////
EditBudget.addEventListener("click", function () {
    if (Is_expanse_set === false) {
        alert("You hadn't set budget for this month");
    }
    else {
        budgetpopup.classList.add('active');
        budgetpopupContent.classList.add('active');
        removesidebar();
        budgetpopupBtn.addEventListener("click", function () {
            budgetManagement();
        })
    }
    restbudget();
});
/////////////////////////// reset budget js//////////////////////////////////////////
function restbudget() {
    var budgetAmount = JSON.parse(localStorage.getItem('budgetlist'));
    var resetvalue = localStorage.getItem('Is_budget_set');
    if (resetvalue == "true") {
        budgetAmount.forEach(function (budget) {
            if (budget.budgetmonth == currentMonth && budget.year == new Date().getFullYear()) {
                resetvalue = true;
                budgetOfMonth.innerHTML = "Budget:Rs " + budget.budgetamount;
                balanceLeft.innerHTML = "Balance:Rs " + (JSON.parse(budget.budgetamount) - TotalExpenseOfmonth(currentMonth, budget.year));
                document.getElementById("TotalExpense").innerHTML = "Expense:Rs " + TotalExpenseOfmonth(currentMonth, new Date().getFullYear());
            }
        })
        localStorage.setItem('Is_budget_set', JSON.stringify(resetvalue));
    }

    else {
        resetvalue = false;
        localStorage.setItem('Is_budget_set', JSON.stringify(resetvalue));
        budgetOfMonth.style.display = "none";
        balanceLeft.style.display = "none";
        document.getElementById("TotalExpense").innerHTML = "Expense:Rs " + TotalExpenseOfmonth(currentMonth, new Date().getFullYear());
    }
    return resetvalue;
}
////////////////////////////// budget management ///////////////////////////////////
function budgetManagement() {
    const currentDate = new Date();
    const cMonth = currentDate.getMonth() + 1;
    const cYear = currentDate.getFullYear();
    const enteredMonth = expensemonth.value;
    const [eYear, eMonth] = enteredMonth.split("-").map(Number);
    if (cMonth !== eMonth || eYear !== cYear) {
        alert("You can only set and edit budget for current month.");
        return;
    }
    const check = TotalExpenseOfmonth(eMonth, eYear);
    const amount = Number(bamount.value);
    if (!amount) {
        alert("Please enter a valid budget amount.");
        return;
    }
    if (check >= amount) {
        alert(`Your current expense is ${check}. Consider increasing your budget.`);
        return;
    }
    if (Is_expanse_set === true) {
        const budgetlist = JSON.parse(localStorage.getItem("budgetlist")) || [];
        const budget = budgetlist.find(b => b.budgetmonth === eMonth && b.year === eYear);
        if (budget) {
            budget.budgetamount = amount;
        } else {
            Is_expanse_set = false;
            // budgetManagement();
            return;
        }
        localStorage.setItem("budgetlist", JSON.stringify(budgetlist));
        localStorage.setItem("Is_budget_set", JSON.stringify(Is_expanse_set));
        alert("Budget edited successfully.");
    } else {
        Is_expanse_set = true;
        const setbud = { budgetmonth: cMonth, budgetamount: amount, year: eYear, budgetid: budid };
        const budgetlist = JSON.parse(localStorage.getItem("budgetlist")) || [];
        budgetlist.push(setbud);
        localStorage.setItem("budgetlist", JSON.stringify(budgetlist));
        localStorage.setItem("Is_budget_set", JSON.stringify(Is_expanse_set));
        Budgetidupdate();
        alert("Budget set successfully.");
    }
    displaybudgetbtn();
    budgetpopup.classList.remove("active");
    budgetpopupContent.classList.remove("active");
}
/////// display set budget if budget is not set else display none
function displaybudgetbtn() {
    const currentDate = new Date();
    const cMonth = currentDate.getMonth() + 1;
    const cYear = currentDate.getFullYear();
    const budgetlist = JSON.parse(localStorage.getItem("budgetlist")) || [];
    const budget = budgetlist.find(b => b.budgetmonth === cMonth && b.year === cYear);
    if (budget) {
        setbudget.style.display = "none";
    } else {
        setbudget.style.display = "flex";
    }
}
///////////////////////////////ckechIs underbudget/////////////////////////////////
function checkIsUnderBudget(budgetmont, budgetyear) {
    var budgetAmount = JSON.parse(localStorage.getItem('budgetlist'));
    var currentBudget = "";
    budgetAmount.forEach(function (budget) {
        if (budget.budgetmonth == budgetmont && budget.year == budgetyear) {
            currentBudget = budget.budgetamount;
        }
    })
    return currentBudget;
}
/////////////////////////// //total expense of month//////////////////////////////
function TotalExpenseOfmonth(budgetmont, budgetyear) {
    var totalexpenseofmonth = 0;
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.month == budgetmont && expense.year == budgetyear) {
            totalexpenseofmonth += JSON.parse(expense.amount);
        }
    })
    return totalexpenseofmonth;
}
//<------------------------------ notes js---------------------------------------------->
const notesContainer = document.getElementById("Notes");
const addNoteButton = notesContainer.querySelector(".add-note");
const notepopup = document.querySelector('#notepopup');
const notecontent = document.querySelector('#NoteContent')
const keepnotes = document.querySelector('#KeepNotes')
const noteclose = document.querySelector('#noteclose')

keepnotes.addEventListener("click", function () {
    notecontent.classList.add('active');
    notepopup.classList.add('active');
    removesidebar();
})
noteclose.addEventListener("click", function () {
    notecontent.classList.remove('active');
    notepopup.classList.remove('active');
})
getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});
addNoteButton.addEventListener("click", () => addNote());
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}
function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });
    element.addEventListener("dblclick", () => {
        const doDelete = confirm(
            "Are you sure you wish to delete this sticky note?"
        );
        if (doDelete) {
            deleteNote(id, element);
        }
    });
    return element;
}
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
    notes.push(noteObject);
    saveNotes(notes);
}
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
}
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
    saveNotes(notes);
    notesContainer.removeChild(element);
}
//<------------------------------ floating btn js---------------------------------------------->
fltbtn.addEventListener("click", function () {
    findcurrentdate();
    const weekArr = currentdate.split("-", 3);
    const currentWeek = getWeek(weekArr[0], weekArr[1] - 1, weekArr[2])
    cost.classList.toggle('active');
    thisday.addEventListener("click", function () {
        DisplayDailyExpenses(currentdate)
    });
    thisweek.addEventListener("click", function () {
        displayweeklyExpenses(currentWeek, weekArr[0]);
    });
    thismonth.addEventListener("click", function () {
        displayMonthlyExpenses(weekArr[1], weekArr[0]);
    });
});
//// closing the btns when clicked outside///////////////////////////////////////
document.addEventListener("click", function (e) {
    if (e.target.parentElement !== fltbtn && e.target !== thisday && e.target !== thisweek && e.target !== thismonth) {
        cost.classList.remove('active');
    }
    if (!e.target.classList.contains('action') && !e.target.classList.contains('editoption')) {
        document.querySelectorAll('.action').forEach(function (action_btn) {
            action_btn.classList.remove('active');
        })
    }

    if (e.target != sidebarContent && e.target != DisplaysidebarContent) {
        sidebarContent.classList.remove('active');
        DisplaysidebarContent.classList.remove('active');
    }
})
////////////////// to remove budget/////////////////////////////////////
document.getElementById("Budgetset&remove").addEventListener("click", function () {
    const currentDate = new Date();
    const cMonth = currentDate.getMonth() + 1;
    const cYear = currentDate.getFullYear();
    var Is_expanse_set = JSON.parse(localStorage.getItem("Is_budget_set"));
    if (Is_expanse_set === true) {
        if (confirm("do you want to remove this budget")) {
            const budgetlist = JSON.parse(localStorage.getItem("budgetlist")) || [];
            const budget = budgetlist.find(b => b.budgetmonth === cMonth && b.year === cYear);
            const index = budgetlist.indexOf(budget);
            budgetlist.splice(index, 1);
            Is_expanse_set = false;
            localStorage.setItem("budgetlist", JSON.stringify(budgetlist));
            localStorage.setItem("Is_budget_set", JSON.stringify(Is_expanse_set));
            alert("budget removed successfully");
            restbudget();
            displaybudgetbtn();
        }
    }
});
////////// function to know 1st, 2nd, 3rd, 4th, 5th week of month///////////////////////
function getWeekOfMonth(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const adjustedDate = dayOfWeek === 0 ? 7 : dayOfWeek;
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.ceil((dayOfMonth + adjustedDate - 1) / 7);
    return weekOfMonth;
}
