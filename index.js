const DisplaysidebarContent = document.querySelector('#sidebar');
const sidebarContent = document.querySelector('.sidebarContent');
const closeBtn = document.querySelector('#closeBtn');
const BudgetcloseBtn = document.querySelector('#budgetcloseBtn');
const editcloseBtn = document.querySelector('#editcloseBtn');
const popup = document.querySelector('#popup');
const popupContent = document.querySelector('#popupContent');
const AddBtn = document.querySelector('#AddBtn');
const AddExpenseInput = document.querySelector('#expenseIn');
const AddExpenseAmount = document.querySelector('#amount');
const ExpenseDate = document.querySelector('#expenseDate');
const OKbtn = document.querySelector('#popupBtn');
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

var deletebtnarray
var editbtnarray
var viewbtnarray
var editoptionarray

findcurrentdate();
restbudget();
displayFromlocalStorage();

function removesidebar() {
    sidebarContent.classList.remove('active');
    DisplaysidebarContent.classList.remove('active');
}
/////////////////////////////////////////  function to find week number////////////////////////////////////////
function getWeek(year, month, date) {
    var onejan = new Date(year, 0, 1);
    var today = new Date(year, month, date);
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.round(dayOfYear / 7)

};
///////////////////////////////////// event listener///////////////////////////////////////////

window.addEventListener('load', function () {
    Homebtn.addEventListener("click", function () {
        window.location.reload();
    })
    //////////////////// id checking  ans budget set checking////////////////////////
    objid = JSON.parse(localStorage.getItem('explastId') || 0);
    budid = JSON.parse(localStorage.getItem('budgetId') || 0);
    Is_expanse_set = (localStorage.getItem('Is_budget_set') || "false");
    ///to display the sidebar content/////////////////////////////
    DisplaysidebarContent.addEventListener('click', function (e) {
        if (e.target.classList.contains('active')) {
            sidebarContent.classList.remove('active');
            DisplaysidebarContent.classList.remove('active');
        } else {
            sidebarContent.classList.add('active');
            DisplaysidebarContent.classList.add('active');
        }
    })
    /////////// popup close ////////////////////////////////////////////////////////////////////////////////////////////////////
    closeBtn.addEventListener('click', function (e) {
        popup.classList.remove('active');
        popupContent.classList.remove('active');
    })
    //////////////////////////////////////  to close the graph popup///////////////////////////////////////////

});

///////////// function to add expense///////////////////////////////////////////////////////////////////////////////////////////////
AddBtn.addEventListener('click', function () {
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
    popup.classList.add('active');
    popupContent.classList.add('active');

    OKbtn.addEventListener('click', function () {
        expenseDate = ExpenseDate.value;
        expenseCategory = ExpenseCat.value;
        console.log(expenseDate);
        console.log(expenseCategory);
        const checkDate = checkEnterdDate(expenseDate, expenseCategory);
        const haveBudgetSet = localStorage.getItem('Is_budget_set');

        function addItem() {
            const weekArr = expenseDate.split('-', 3);
            const enteredMonth = weekArr[1];
            const currentWeekNumber = getWeek(weekArr[0], weekArr[1] - 1, weekArr[2]);
            AddtoExpenselist(expenseInput, expenseAmount, expenseDate, objid);
            AddtolocacalStorage(expenseInput, expenseAmount, expenseDate, objid, enteredMonth, weekArr[0], expenseCategory, currentWeekNumber);

            updateid();

            ExpenseDate.value = '';
            ExpenseCat.value = 'SelectCategory';
            AddExpenseInput.value = '';
            AddExpenseAmount.value = '';
            popup.classList.remove('active');
            popupContent.classList.remove('active');
        }
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
                    ExpenseDate.value = '';
                    ExpenseCat.value = 'SelectCategory';
                    AddExpenseInput.value = '';
                    AddExpenseAmount.value = '';
                    popup.classList.remove('active');
                    popupContent.classList.remove('active');
                }
            } else {
                addItem();
            }
        }
    });
});
///// function addto local storage////////////////////////////////////////////////////////////////////////////////////////////////////
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
}
///////////// function for amount validation ///////////////////////////////////////////////////////////////////////////////////////////////
function AmountValidation(Amount) {
    if (!Number.isInteger(parseInt(Amount)) || Amount <= 0) {
        alert('Please enter a valid amount');
        return false;
    } else {
        return true;
    }
}
//////////////// function to update id /////////////////////////////////////////////////////////////////////////////////////////////////
function updateid() {
    objid++;
    explastId = objid;
    localStorage.setItem('explastId', JSON.stringify(explastId));
}
function updateids() {
    budid++;
    budgetId = budid;
    localStorage.setItem('budgetId', JSON.stringify(budgetId));
}
///////////// function find current date ///////////////////////////////////////////////////////////////////////////////////////////////

function findcurrentdate() {
    const now = new Date();
    const year = now.getFullYear();
    /* the padStart method to add leading zeros to the month and date values if they are less than 10.  */
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    currentdate = `${year}-${month}-${date}`;
    currentMonth = month;
}
///////////// function to check Entered dDate ///////////////////////////////////////////////////////////////////////////////////////////////  

function checkEnterdDate(Endate, Ecategory) {

    if (Endate == '' || Ecategory == 'SelectCategory') {
        alert(' Please fill all the fields from the form correctly');
    }
    else if ((Endate == currentdate || new Date(currentdate).getTime() > new Date(Endate).getTime()) && (Ecategory != 'SelectCategory')) {
        return true;
    }
}
///////////// function to display the expense list ///////////////////////////////////////////////////////////////////////////////////////////////
function displayFromlocalStorage() {
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.date == currentdate) {
            let li = document.createElement('div');
            li.classList.add('Expense');
            li.innerHTML = `
            <div>${expense.expense}</div>
            <div>${expense.amount}</div>
            <div>${expense.date}</div>
           <div class="actionbtncontainer"> <div class="action deletebtn">Delete</div> <div  class="action editbtn">Edit</div> <div class="action viewbtn">View</div></div> <div class="editoption">...</div>`;
            TodayExpense.appendChild(li);
            li.setAttribute('id', expense.id);
        }
    })
    addcontrolbtns();
}
///////////////////////////////// function to Add to expense list ///////////////////////////////////////////////////////////////////////////////////////////////
function AddtoExpenselist(AddExpenseInput, AddExpenseAmount, ExpenseDate, id) {
    if (ExpenseDate === currentdate) {
        let li = document.createElement('div');
        li.classList.add('Expense');
        li.innerHTML =
            `<div>${AddExpenseInput.toLowerCase()}</div>
       <div>${AddExpenseAmount}</div>
       <div>${ExpenseDate}</div>
        <div class="actionbtncontainer"><div  class="action deletebtn">Delete</div><div class="action editbtn">Edit</div><div class="action viewbtn">View</div></div>
        <div class="editoption">...</div>`;
        li.setAttribute('id', id);
        TodayExpense.appendChild(li);
    }

}

function addcontrolbtns() {
    deletebtnarray = document.querySelectorAll('.deletebtn');
    editbtnarray = document.querySelectorAll('.editbtn');
    viewbtnarray = document.querySelectorAll('.viewbtn');
    editoptionarray = document.querySelectorAll('.editoption');

    deletebtnarray.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            const parent = e.target.parentElement.parentElement.id;
            console.log(parent);
            deletefromlocalstorage(parent);
            e.target.parentElement.remove();
        })
    });

    editbtnarray.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            const parent = e.target.parentElement.parentElement.id;
            initiateEdit(parent)
            e.target.parentElement.remove();
        })
    });

    viewbtnarray.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            const parent = e.target.parentElement.parentElement.id;
            viewfromlocalstorage(parent);
        })
    });

    editoptionarray.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            // display the edit delete and view options of the clicked expense
            const parent = e.target.parentElement.id;
            document.querySelectorAll('.action').forEach(function (btn) {
                if (btn.parentElement.parentElement.id == parent) {
                    btn.classList.toggle('active');
                }
                ////////////////////////// remove all  div with class action when any one is clicked  ///////////////////////////////////////////////////////////////////////////////////////////////

                document.querySelectorAll('.action').forEach(function (btn) {
                    btn.addEventListener('click', function (e) {
                        document.querySelectorAll('.action').forEach(function (btn) {
                            btn.classList.remove('active');
                        })
                    })
                })

            })

        })
    })


}
//////////////////////////////////// initiate edit ///////////////////////////////////////////////////////////////////////////////////////////////

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

    editcloseBtn.addEventListener('click', function () {
        editpopup.classList.toggle('active');
        editpopupContent.classList.toggle('active');
    });

    editbtn.addEventListener('click', function () {
        console.log(AmountValidation(EditExpenseAmount.value));
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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

function deletefromlocalstorage(id) {
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    for (let i = 0; i < expenseList.length; i++) {
        if (expenseList[i].id == id) {
            expenseList.splice(i, 1);
        }
    }
    restbudget();
    localStorage.setItem('expenseList', JSON.stringify(expenseList));
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createstructure(expense, where_to_add) {
    let li = document.createElement('div');
    li.classList.add('Expense');
    li.innerHTML = `
    <div>${expense.expense}</div>
    <div>${expense.amount}</div>
    <div>${expense.date}</div>
    <div class="actionbtncontainer"><div  class="action deletebtn">Delete</div><div  class="action editbtn">Edit</div><div  class="action viewbtn">View</div></div>
    <div class="editoption">...</div>`
    li.setAttribute('id', expense.id);
    where_to_add.appendChild(li);
    MonthlyExpense.style.display = "none";
    WeeklyExpense.style.display = "none";
    TodayExpense.style.display = "none";
    where_to_add.style.display = "flex";

}

function displayMonthlyExpenses(month, year) {

    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.month == month && expense.year == year) {
            createstructure(expense, MonthlyExpense);
        }
    })
}

function displayweeklyExpenses(week, year) {

    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.week == week && expense.year == year) {
            createstructure(expense, WeeklyExpense);
        }
    })
}


function DisplayDailyExpenses(date) {

    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.date === date) {
            existFlag = true;
            createstructure(expense, DailyMonthlyExpense);
        }
    })
}



const ExpenseTypeBtn = document.querySelector('#ExpenseTypeBtn');
const typeCat = document.querySelector('#typeCat');
const OkBtn = document.querySelector('#ExpenseTypeSubmissionBtn');
const BackBtn = document.querySelector('#TypeBackBtn');
const typemonth = document.querySelector('#typemonth');
const typeweek = document.querySelector('#typeweek');
const typeDate = document.querySelector('#typeDate');
const submitbtn = document.querySelector('#TypeSubmissionBtn');
const heading = document.querySelector('#changing');



OkBtn.addEventListener('click', function () {

    if (typeCat.value === 'Select Expense detail type') {
        alert('Please Select Category');
    } else {
        heading.innerHTML = "Select" + " " + typeCat.value + " " + "to view";
        BackBtn.classList.add('active');
        OkBtn.style.display = 'none';
        submitbtn.classList.add('active');
        typeCat.style.display = 'none';

        if (typeCat.value === 'Monthly Expense') {
            typemonth.classList.add('active');
            typeweek.classList.remove('active');
            typeDate.classList.remove('active');
        } else if (typeCat.value === 'Weekly Expense') {

            typeweek.classList.add('active');
            typemonth.classList.remove('active');
            typeDate.classList.remove('active');
        } else if (typeCat.value === 'Daily Expense') {

            typeDate.classList.add('active');
            typeweek.classList.remove('active');
            typemonth.classList.remove('active');
        }
    }
})

function restoreBack() {
    ExpenseType.classList.remove('active');
    ExpenseTypeconts.classList.remove('active');
    BackBtn.classList.remove('active');
    submitbtn.classList.remove('active');
}
BackBtn.addEventListener('click', function () {
    OkBtn.style.display = 'flex';
    BackBtn.classList.remove('active');
    submitbtn.classList.remove('active');
    typeCat.style.display = 'block';
    typemonth.classList.remove('active');
    typeweek.classList.remove('active');
    typeDate.classList.remove('active');
    heading.innerHTML = "Select Expense Type";
})


function close() {
    ExpenseType.classList.remove('active');
    ExpenseTypeconts.classList.remove('active');
    OkBtn.style.display = 'flex';
    BackBtn.classList.remove('active');
    submitbtn.classList.remove('active');
    typeCat.style.display = 'flex';
    typemonth.classList.remove('active');
    typeweek.classList.remove('active');
    typeDate.classList.remove('active');
    heading.innerHTML = "Select Expense Type";
}

ExpenseTypeBtn.addEventListener('click', () => close())

DetailedReportOfExpense.addEventListener('click', () => De_R_o_E())

function De_R_o_E() {

    ExpenseType.classList.add('active');
    ExpenseTypeconts.classList.add('active');
    sidebarContent.classList.remove('active');
    DisplaysidebarContent.classList.remove('active');



    submitbtn.addEventListener('click', function () {

        if (typeCat.value === 'Monthly Expense') {
            if (typemonth.value === '') {
                alert('Please Select Month');
            } else {
                let text = typemonth.value;
                const input = text.split("-", 2);
                displayMonthlyExpenses(input[1], input[0]);
                typemonth.classList.remove('active');
                restoreBack();
            }


        } else if (typeCat.value === 'Weekly Expense') {

            if (typeweek.value === '') {

                alert('Please Select Week');
            } else {

                let text = typeweek.value;
                const input = text.split("-W", 2);
                displayweeklyExpenses(input[1], input[0]);
                typeweek.classList.remove('active');
                restoreBack();

            }
        } else if (typeCat.value === 'Daily Expense') {

            if (typeDate.value === '') {
                alert('Please Select Date');
            } else {

                DisplayDailyExpenses(typeDate.value);
                typeDate.classList.remove('active');
                restoreBack();
            }
        }
        close();
    })


}



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
            cat.innerHTML = "Categeory" + expense.category



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

//////////////////////////////////// set budget ////////////////////////////////////////





setbudget.addEventListener("click", function () {


    budgetpopup.classList.add('active');
    budgetpopupContent.classList.add('active');

    budgetpopupBtn.addEventListener("click", function () {

        let currentDate = new Date();
        let cMonth = currentDate.getMonth() + 1
        let cyear = currentDate.getFullYear();
        let enteredmonth = expensemonth.value;
        let input = enteredmonth.split("-", 2);
        let emonth = parseInt(input[1]);
        let eyear = parseInt(input[0]);

        if (cMonth == emonth && eyear == cyear && Is_expanse_set == "false") {
            var check = TotalExpenseOfmonth(emonth, eyear);

            var Isvalid = AmountValidation(bamount.value);


            if (check < bamount.value && Isvalid == true) {
                Is_expanse_set = true;

                let setbud = {
                    budgetmonth: cMonth,
                    budgetamount: bamount.value,
                    year: eyear,
                    budgetid: budid
                }

                let budgetlist = JSON.parse(localStorage.getItem('budgetlist')) || [];
                budgetlist.push(setbud);
                localStorage.setItem('budgetlist', JSON.stringify(budgetlist));

                localStorage.setItem('Is_budget_set', JSON.stringify(Is_expanse_set))

                updateids();
                restbudget();
                budgetpopup.classList.remove('active');
                budgetpopupContent.classList.remove('active');

            } else if (check >= bamount.value && Isvalid == true) {
                alert("think you should extent your budget your current expense is" + check);
            }

        } else if (enteredmonth == "" || bamount.value == "") {
            alert("please fill all the fields");
        } else if (localStorage.getItem('Is_budget_set') == "true") {
            alert("budget for this month is set");
            budgetpopup.classList.remove('active');
            budgetpopupContent.classList.remove('active');
        } else {
            alert("you can only set budget for current month");
        }
    })
})




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

function restbudget() {

    var budgetAmount = JSON.parse(localStorage.getItem('budgetlist'));
    var resetvalue = localStorage.getItem('Is_budget_set');

    if (resetvalue == "true") {
        budgetAmount.forEach(function (budget) {

            if (budget.budgetmonth == currentMonth && budget.year == new Date().getFullYear()) {

                resetvalue = true;
                budgetOfMonth.innerHTML = "Budget: " + budget.budgetamount;
                balanceLeft.innerHTML = "Balance: " + (JSON.parse(budget.budgetamount) - TotalExpenseOfmonth(currentMonth, budget.year));

            } else {

                resetvalue = false;
                budgetOfMonth.innerHTML = "Budget: ";
                balanceLeft.innerHTML = "Balance: "
            }
        })
        localStorage.setItem('Is_budget_set', JSON.stringify(resetvalue));
    }

    return resetvalue;
}

const EditBudget = document.querySelector("#EditBudget");


const budgetpopup = document.querySelector('#budgetpopup');
const budgetpopupContent = document.querySelector('#budgetpopupContent');
const budgetpopupBtn = document.querySelector('#budgetpopupBtn');
const expensemonth = document.querySelector('#expensemonth');
const bamount = document.querySelector('#bamount');
const budgetcloseBtn = document.querySelector('#budgetcloseBtn');

budgetcloseBtn.addEventListener("click", function () {

    budgetpopup.classList.remove('active');
    budgetpopupContent.classList.remove('active');
})


EditBudget.addEventListener("click", () => editBudget());

function editBudget() {

    budgetpopup.classList.add('active');
    budgetpopupContent.classList.add('active');
    removesidebar();

    budgetpopupBtn.addEventListener("click", function () {

        let currentDate = new Date();
        let cMonth = currentDate.getMonth() + 1
        let cyear = currentDate.getFullYear();
        let enteredmonth = expensemonth.value;
        let input = enteredmonth.split("-", 2);
        let emonth = parseInt(input[1]);
        let eyear = parseInt(input[0]);


        if (cMonth == emonth && eyear == cyear && Is_expanse_set == "true") {
            var check = TotalExpenseOfmonth(emonth, eyear);

            var Isvalid = AmountValidation(bamount.value);


            if (check < bamount.value && Isvalid == true) {


                let budgetlist = JSON.parse(localStorage.getItem('budgetlist')) || [];

                budgetlist.forEach(function (budget) {
                    if (budget.budgetmonth == emonth && budget.year == eyear) {

                        budget.budgetamount = bamount.value;
                        budget.budgetmonth = emonth;
                        budget.year = eyear;
                        budget.budgetid = budget.budgetid;
                    }
                })
                localStorage.setItem('budgetlist', JSON.stringify(budgetlist));
                budgetpopup.classList.remove('active');
                budgetpopupContent.classList.remove('active');
                alert("budget edited successfully");

                restbudget();
            } else if (check >= bamount.value && Isvalid == true) {
                alert("think you should extent your budget your current expense is" + check);
            }

        } else if (Is_expanse_set == "false") {
            alert("You hadn't set budget for this month");
        } else {
            alert("you can only edit budget for current month");
        }
    })
}








////////////////////////////////////////////////// set budget ends/////////////////////////


////////////////////////////////////////// graph begins /////////////////////////////////

const graphViewerBtn = document.querySelector('#graphViewer');
const displayGraphpopup = document.querySelector('#displayGraphpopup')
const displayGraphpopupContent = document.querySelector('#displayGraphpopupContent')
const graphcloser = document.querySelector("#GraphcloseBtn");



graphViewerBtn.addEventListener("click", function () {

    var isGraphReady = 0;

    ExpenseType.classList.add('active');
    ExpenseTypeconts.classList.add('active');

    let text;
    let input;

    submitbtn.addEventListener('click', function () {
        if (typeCat.value === 'Monthly Expense') {

            if (typemonth.value === '') {
                alert('Please Select Month');
                isGraphReady = 0;
            } else {
                text = typemonth.value;

                input = text.split("-", 2);
                typemonth.classList.remove('active');
                isGraphReady = 1;
                restoreBack();
                viewgraphs();
            }

        } else if (typeCat.value === 'Weekly Expense') {
            if (typeweek.value === '') {

                alert('Please Select Week');
                isGraphReady = 0;
            } else {

                text = typeweek.value;
                input = text.split("-W", 2);
                isGraphReady = 1;
                typeweek.classList.remove('active');
                restoreBack();
                viewgraphs();

            }
        } else if (typeCat.value === 'Daily Expense') {

            if (typeDate.value === '') {
                alert('Please Select Date');
                isGraphReady = 0;
            } else {
                isGraphReady = 1;
                typeDate.classList.remove('active');
                restoreBack();
                viewgraphs();
            }
        }
    })

    function viewgraphs() {
        if (isGraphReady == 1) {
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
                                console.log(expenseArray[expense.category]);
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
            });
        }

    }

})

graphcloser.addEventListener("click", function () {
    displayGraphpopup.classList.remove('active');
    displayGraphpopupContent.classList.remove('active');
    location.reload();
})





///////////////////////////////////// graph end //////////////////////////


/////// notes js////////////////////////////////////////////////////////////

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


//



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


/////////////////////////////////////////////////////////////////////////////

