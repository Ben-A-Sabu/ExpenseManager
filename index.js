/*import sidebar from './assets/sidebar.png'



import { app as firebase } from './firebase-config'


import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
//import { getDatabase, ref, set, child, update, remove } from "firebase/database";



const auth = getAuth(firebase);
const googleAuthProvider = new GoogleAuthProvider();

const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');



loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
})

logoutBtn.addEventListener('click', () => {


    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.")
    }).catch((error) => {
        // An error happened.
    });
})

onAuthStateChanged(auth, user => {
    if (user) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block'
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none'
    }

})
*/
//const db = getDatabase(firebase)


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
const ExpensesList = document.querySelector('.Expenses'); /////
const Expense = document.querySelector('.Expense');
const TodayExpense = document.querySelector('#TodaysExpense');
const MonthlyExpenseList = document.querySelector('#MExpense');
const MonthlyExpense = document.querySelector('.ExpenseOfM');
const WeeklyExpenseList = document.querySelector('#WExpense');
const WeeklyExpense = document.querySelector('.ExpenseOfW');
const DailyExpenseList = document.querySelector('#DExpense');
const DailyMonthlyExpense = document.querySelector('.ExpenseOfD');
const DetailedReportOfExpense = document.querySelector('#Details');
const setbudget = document.querySelector('#SetBudget');
const ExpenseType = document.querySelector('#ExpenseType');
const ExpenseTypeconts = document.querySelector('#ExpenseTypeconts');
const view = document.querySelector('#ViewType');
const viewTypeconts = document.querySelector('#ViewTypeconts');
const budgetOfMonth = document.querySelector('#budgetOfMon');
const balanceLeft = document.querySelector('#balance');
const Homebtn = document.querySelector("#HomeBtn");

var Is_expanse_set;

function removesidebar() {
    sidebarContent.classList.remove('active');
    DisplaysidebarContent.classList.remove('active');
}


/////////////////////////////////


function getWeek(year, month, date) {
    var onejan = new Date(year, 0, 1);
    var today = new Date(year, month, date);
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.round(dayOfYear / 7)

};


Homebtn.addEventListener("click", function () {

    window.location.reload();
})




//////////////////////////////////////


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

findcurrentdate();
restbudget();
displayFromlocalStorage();



//////////////////// id checking  ans budget set checking////////////////////////

if (localStorage.getItem('explastId') != null) {

    objid = localStorage.getItem('explastId');
    objid = JSON.parse(objid);

} else {
    objid = 0;
}

if (localStorage.getItem('budgetId') != null) {
    budid = localStorage.getItem('budgetId');
    budid = JSON.parse(budid);

} else {
    budid = 0;

}


/////////////////////////////////////////////////////////////


if (localStorage.getItem('Is_budget_set') == null) {

    Is_expanse_set = "false"

} else {

    Is_expanse_set = localStorage.getItem('Is_budget_set')
}



///  function to display the sidebar content/////////////////////////////
DisplaysidebarContent.addEventListener('click', function (e) {
    if (e.target.classList.contains('active')) {
        sidebarContent.classList.remove('active');
        DisplaysidebarContent.classList.remove('active');
    } else {
        sidebarContent.classList.add('active');
        DisplaysidebarContent.classList.add('active');
    }


})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////// popup close function////////////////////////////////////////////////////////////////////////////////////////////////////
closeBtn.addEventListener('click', function (e) {

    popup.classList.remove('active');
    popupContent.classList.remove('active');


})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////// function to add expense///////////////////////////////////////////////////////////////////////////////////////////////
AddBtn.addEventListener('click', function () {

    if (AddExpenseInput.value === '' || AddExpenseAmount.value === '') {
        alert('Please fill all the fields');
    } else {

        var check = AmountValidation(AddExpenseAmount.value);


        if (check === true) {

            popup.classList.add('active');
            popupContent.classList.add('active');


            OKbtn.addEventListener('click', function () {
                console.log(ExpenseDate.value, ExpenseCat.value)
                var checkdate = checkEnterdDate(ExpenseDate.value, ExpenseCat.value);
                var havebudgetset = localStorage.getItem('Is_budget_set');


                function additem() {
                    let text = ExpenseDate.value;
                    const weekarr = text.split("-", 3);
                    currentWeekNumber = getWeek(weekarr[0], weekarr[1] - 1, weekarr[2]);
                    enteredmonth = weekarr[1];
                    AddtoExpenselist(AddExpenseInput.value, AddExpenseAmount.value, ExpenseDate.value, objid);
                    AddtolocacalStorage(AddExpenseInput.value, AddExpenseAmount.value, ExpenseDate.value, objid, enteredmonth, weekarr[0], ExpenseCat.value, currentWeekNumber);

                    updateid();




                    /*set(ref(db, "The_Expenses/" + AddExpenseAmount.value), {

                            expense: AddExpenseInput.value.toLowerCase(),
                            amount: AddExpenseAmount.value,
                            date: ExpenseDate.value,
                            id: objid,
                            month: enteredmonth,
                            year: weekarr[0],
                            category: ExpenseCat.value,
                            week: currentWeekNumber,


                        }).then(() => {
                            alert("data stored sucessfully")
                        })
                        .catch((error) => {
                            alert("unsucessfull, error" + error);

                        });*/



                    ExpenseDate.value = '';
                    ExpenseCat.value = 'SelectCategory';
                    popup.classList.remove('active');
                    popupContent.classList.remove('active');
                    AddExpenseInput.value = '';
                    AddExpenseAmount.value = '';
                }


                if (checkdate === true) {

                    let text = ExpenseDate.value;
                    const weekarr = text.split("-", 3);

                    if (weekarr[1] == currentMonth && weekarr[0] == new Date().getFullYear() && havebudgetset == "true") {
                        var Isunder = parseInt(TotalExpenseOfmonth(weekarr[1], weekarr[0]));
                        var assignedbudget = parseInt(checkIsUnderBudget(weekarr[1], weekarr[0]));

                        Isunder += parseInt(AddExpenseAmount.value);

                        console.log(Isunder, assignedbudget);

                        if (Isunder < assignedbudget) {
                            additem();

                        } else {
                            ExpenseDate.value = '';
                            ExpenseCat.value = 'SelectCategory';
                            popup.classList.remove('active');
                            popupContent.classList.remove('active');
                            AddExpenseInput.value = '';
                            AddExpenseAmount.value = '';
                            alert("You have meet your budget");
                        }
                    } else {

                        additem();
                    }

                }

                window.location.reload();
            })


        }
    }


});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////// function for amount validation ///////////////////////////////////////////////////////////////////////////////////////////////
function AmountValidation(Amount) {
    if (Number.isInteger(parseInt(Amount)) === false) {
        alert('Please enter avalid format of amount');
        flag = false;
    } else if (Amount <= 0) {
        alert('Please enter a valid amount');
        flag = false;
    } else {

        flag = true;

    }

    return flag;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////// function find current date ///////////////////////////////////////////////////////////////////////////////////////////////

function findcurrentdate() {
    if (new Date().getMonth() + 1 < 10) {
        if (new Date().getDate() < 10) {
            currentdate = new Date().getFullYear() + '-' + "0" + (new Date().getMonth() + 1) + '-' + "0" + new Date().getDate();
            currentMonth = "0" + (new Date().getMonth() + 1);
        } else {
            currentdate = new Date().getFullYear() + '-' + "0" + (new Date().getMonth() + 1) + '-' + new Date().getDate();
            currentMonth = "0" + (new Date().getMonth() + 1);
        }
    } else {

        if (new Date().getDate() < 10) {
            currentdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + "0" + new Date().getDate();
            currentMonth = (new Date().getMonth() + 1);
        } else {
            currentdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
            currentMonth = (new Date().getMonth() + 1);
        }
    }


}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////// function to check Entered dDate ///////////////////////////////////////////////////////////////////////////////////////////////  

function checkEnterdDate(Endate, Ecategory) {

    if (Endate == '' || Ecategory == 'SelectCategory') {
        alert(' Please fill all the fields');
        dateflag = false;

    } else if ((Endate == currentdate || new Date(currentdate).getTime() > new Date(Endate).getTime()) && (Ecategory != 'SelectCategory')) {

        dateflag = true;

    } else {
        alert('Please enter a valid date');
        dateflag = false;
    }

    return dateflag;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////// function to display the expense list ///////////////////////////////////////////////////////////////////////////////////////////////

function displayFromlocalStorage() {
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];


    expenseList.forEach(function (expense) {

        if (expense.date == currentdate) {

            const li = document.createElement('li');
            li.classList.add('Expense');
            li.innerHTML = `
            <p>${expense.expense}</p>
            <p>${expense.amount}</p>
            <p>${expense.date}</p>
            <button  class="action" id="dltbtn">Delete</button><button  class="action" id="editbtn">Edit</button><button  class="action" id="viewbtn">View</button>
           `;

            Expense.appendChild(li);
            li.setAttribute('id', expense.id);
            TodayExpense.appendChild(li);

        }
    })
}


function AddtoExpenselist(AddExpenseInput, AddExpenseAmount, ExpenseDate, id) {

    if (ExpenseDate === currentdate) {

        let li = document.createElement('li');
        li.classList.add('Expense');
        li.innerHTML =
            `<p>${AddExpenseInput.toLowerCase()}</p>
       <p>${AddExpenseAmount}</p>
       <p>${ExpenseDate}</p>
        <button  class="action" id="dltbtn">Delete</button><button class="action" id="editbtn">Edit</button><button  class="action" id="viewbtn">View</button>`;
        Expense.appendChild(li);
        li.setAttribute('id', id);
        TodayExpense.appendChild(li);
    }

}






ExpensesList.addEventListener('click', function (e) {



    if (e.target.id === 'dltbtn') {
        deletefromlocalstorage(e.target.parentElement.id);
        e.target.parentElement.remove();

    }


    if (e.target.id === 'editbtn') {

        const editpopup = document.querySelector('#editpopup');
        const editpopupContent = document.querySelector('#editpopupContent');
        editpopup.classList.add('active');
        editpopupContent.classList.add('active');

        editcloseBtn.addEventListener('click', function (e) {

            editpopup.classList.remove('active');
            editpopupContent.classList.remove('active');


        })

        var isEdited = false;
        //////////////////////////Entries to the edit //////////////////////////////////
        const EditExpenseInput = document.querySelector('#EexpenseIn');
        const EditExpenseAmount = document.querySelector('#Eamount');
        const EditExpenseDate = document.querySelector('#editexpenseDate');
        const EditExpenseCat = document.querySelector('#editExpenseCat');
        const editbtn = document.querySelector('#editpopupBtn');

        ///////////////////////////////Entries to the edit //////////////////////////////////
        editbtn.addEventListener('click', function () {


            if (EditExpenseInput.value === '' || EditExpenseAmount.value === '' || EditExpenseDate.value === '' || EditExpenseCat.value === 'SelectCategory') {
                alert('Please fill all the fields');
            } else {

                var check = AmountValidation(EditExpenseAmount.value);

                if (check === true) {

                    editbtn.addEventListener('click', function () {



                        var checkdate = checkEnterdDate(EditExpenseDate.value, EditExpenseCat.value);


                        if (checkdate === true) {
                            e.target.parentElement.setAttribute('id', e.target.parentElement.id);
                            let text = EditExpenseDate.value;
                            const weekarr = text.split("-", 3);
                            let WeekNumber = getWeek(weekarr[0], weekarr[1] - 1, weekarr[2]);
                            let Enteredmonth = weekarr[1];
                            editfromlocalstorage(EditExpenseInput.value, EditExpenseAmount.value, EditExpenseDate.value, EditExpenseCat.value, e.target.parentElement.id, WeekNumber, Enteredmonth, weekarr[0]);
                            //   writeDatatodatabase1(EditExpenseInput.value, EditExpenseAmount.value, EditExpenseDate.value, EditExpenseCat.value, e.target.parentElement.id, WeekNumber, Enteredmonth, weekarr[0]);
                            ///////////////////////////////edit from local storage///////////////////////////////
                            isEdited = true;
                        }


                    })

                }
                ///////////////////////////////////////////////////////////////////
            }
        });

        if (isEdited === true) {
            alert("Expense edited successfully");
            editpopup.classList.remove('active');
            editpopupContent.classList.remove('active');
            restbudget();
            isEdited = false;
        }
    }

    if (e.target.id === 'viewbtn') {

        viewfromlocalstorage(e.target.parentElement.id);
    }



})


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
    window.location.reload()
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

function displayMonthlyExpenses(month, year) {

    if (MonthlyExpenseList.textContent.trim().length > 0) {
        MonthlyExpenseList.innerHTML = ""
    }

    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.month == month && expense.year == year) {

            let li = document.createElement('li');
            li.classList.add('Expense');
            li.innerHTML = `
            <p>${expense.expense}</p>
            <p>${expense.amount}</p>
            <p>${expense.date}</p>
            <button  class="action" id="dltbtn">Delete</button><button  class="action" id="editbtn">Edit</button><button  class="action" id="viewbtn">View</button>
           `;
            MonthlyExpense.appendChild(li);
            li.setAttribute('id', expense.id);
            MonthlyExpenseList.appendChild(li);
            MonthlyExpense.style.display = 'block';
            MonthlyExpenseList.style.display = 'block';
            TodayExpense.style.display = 'none';
            Expense.style.display = 'none';
            WeeklyExpense.style.display = 'none';
            WeeklyExpenseList.style.display = 'none';
        }
    })


}

function displayweeklyExpenses(week, year) {
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];

    if (WeeklyExpenseList.textContent.trim().length > 14) {
        WeeklyExpenseList.innerHTML = ""
    }

    expenseList.forEach(function (expense) {

        if (expense.week == week && expense.year == year) {

            let li = document.createElement('li');
            li.classList.add('Expense');
            li.innerHTML = `
            <p>${expense.expense}</p>
            <p>${expense.amount}</p>
            <p>${expense.date}</p>
            <button  class="action" id="dltbtn">Delete</button><button  class="action" id="editbtn">Edit</button><button  class="action" id="viewbtn">View</button>
           `;
            WeeklyExpense.appendChild(li);
            li.setAttribute('id', expense.id);
            WeeklyExpenseList.appendChild(li);
            MonthlyExpense.style.display = 'none';
            MonthlyExpenseList.style.display = 'none';
            TodayExpense.style.display = 'none';
            Expense.style.display = 'none';
            WeeklyExpense.style.display = 'block';
            WeeklyExpenseList.style.display = 'block';

        }
    })





}

function DisplayDailyExpenses(date) {

    if (DailyExpenseList.textContent.trim().length > 0) {
        DailyExpenseList.innerHTML = ""
    }


    var existFlag = false;
    let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
    expenseList.forEach(function (expense) {
        if (expense.date === date) {
            existFlag = true;
            let li = document.createElement('li');
            li.classList.add('Expense');
            li.innerHTML = `
            <p>${expense.expense}</p>
            <p>${expense.amount}</p>
            <p>${expense.date}</p>
            <button  class="action" id="dltbtn">Delete</button><button  class="action" id="editbtn">Edit</button><button  class="action" id="viewbtn">View</button>
           `;
            DailyMonthlyExpense.appendChild(li);
            li.setAttribute('id', expense.id);
            DailyExpenseList.appendChild(li);
            DailyMonthlyExpense.style.display = 'block';
            DailyExpenseList.style.display = 'block';
            TodayExpense.style.display = 'none';
            Expense.style.display = 'none';
            WeeklyExpense.style.display = 'none';
            WeeklyExpenseList.style.display = 'none';
            MonthlyExpense.style.display = 'none';
            MonthlyExpenseList.style.display = 'none';

        }
    })


    if (existFlag == false) {

        DailyMonthlyExpense.style.display = 'block';
        DailyExpenseList.style.display = 'block';
        TodayExpense.style.display = 'none';
        WeeklyExpense.style.display = 'none';
        WeeklyExpenseList.style.display = 'none';
        MonthlyExpense.style.display = 'none';
        MonthlyExpenseList.style.display = 'none';
        Expense.style.display = 'none';
    }
}

DetailedReportOfExpense.addEventListener('click', () => De_R_o_E())

function De_R_o_E() {

    ExpenseType.classList.add('active');
    ExpenseTypeconts.classList.add('active');
    sidebarContent.classList.remove('active');
    DisplaysidebarContent.classList.remove('active');

    const ExpenseTypeBtn = document.querySelector('#ExpenseTypeBtn');



    const typeCat = document.querySelector('#typeCat');
    const OkBtn = document.querySelector('#ExpenseTypeSubmissionBtn');
    const BackBtn = document.querySelector('#TypeBackBtn');
    const typemonth = document.querySelector('#typemonth');
    const typeweek = document.querySelector('#typeweek');
    const typeDate = document.querySelector('#typeDate');
    const submitbtn = document.querySelector('#TypeSubmissionBtn');
    const heading = document.querySelector('#changing');

    ExpenseTypeBtn.addEventListener('click', () => close())

    function close() {

        ExpenseType.classList.remove('active');
        ExpenseTypeconts.classList.remove('active');
        OkBtn.style.display = 'block';
        BackBtn.classList.remove('active');
        submitbtn.classList.remove('active');
        typeCat.style.display = 'block';
        typemonth.classList.remove('active');
        typeweek.classList.remove('active');
        typeDate.classList.remove('active');
        heading.innerHTML = "Select Expense Type";

    }

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
        OkBtn.style.display = 'block';
        BackBtn.classList.remove('active');
        submitbtn.classList.remove('active');
        typeCat.style.display = 'block';
        typemonth.classList.remove('active');
        typeweek.classList.remove('active');
        typeDate.classList.remove('active');
        heading.innerHTML = "Select Expense Type";

    })

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

    const budgetpopup = document.querySelector('#budgetpopup');
    const budgetpopupContent = document.querySelector('#budgetpopupContent');
    const budgetpopupBtn = document.querySelector('#budgetpopupBtn');
    const expensemonth = document.querySelector('#expensemonth');
    const bamount = document.querySelector('#bamount');
    const budgetcloseBtn = document.querySelector('#budgetcloseBtn');

    budgetpopup.classList.add('active');
    budgetpopupContent.classList.add('active');

    budgetcloseBtn.addEventListener("click", function () {

        budgetpopup.classList.remove('active');
        budgetpopupContent.classList.remove('active');
    })

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
                //  writeDatatodatabase2(cMonth, bamount.value, eyear, budid, Is_expanse_set)
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

EditBudget.addEventListener("click", () => editBudget());

function editBudget() {


    const budgetpopup = document.querySelector('#budgetpopup');
    const budgetpopupContent = document.querySelector('#budgetpopupContent');
    const budgetpopupBtn = document.querySelector('#budgetpopupBtn');
    const expensemonth = document.querySelector('#expensemonth');
    const bamount = document.querySelector('#bamount');
    const budgetcloseBtn = document.querySelector('#budgetcloseBtn');

    budgetpopup.classList.add('active');
    budgetpopupContent.classList.add('active');
    removesidebar();

    budgetcloseBtn.addEventListener("click", function () {

        budgetpopup.classList.remove('active');
        budgetpopupContent.classList.remove('active');
    })

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



var He_amount = 0;
var Te_amount = 0;
var Fe_amount = 0;
var Le_amount = 0;
var Bo_amount = 0;
var Hc_eamount = 0;
var Pe_amount = 0;
var Ee_amount = 0;
var Cre_amount = 0;
var Ot_amount = 0;

const graphViewerBtn = document.querySelector('#graphViewer');
const displayGraphpopup = document.querySelector('#displayGraphpopup')
const displayGraphpopupContent = document.querySelector('#displayGraphpopupContent')
const graphcloser = document.querySelector("#GraphcloseBtn");

graphcloser.addEventListener("click", function () {

    displayGraphpopup.classList.remove('active');
    displayGraphpopupContent.classList.remove('active');
    window.location.reload();

})



graphViewerBtn.addEventListener("click", function () {

    var isGraphReady = 0;

    ExpenseType.classList.add('active');
    ExpenseTypeconts.classList.add('active');
    sidebarContent.classList.remove('active');
    DisplaysidebarContent.classList.remove('active');

    const ExpenseTypeBtn = document.querySelector('#ExpenseTypeBtn');



    const typeCat = document.querySelector('#typeCat');
    const OkBtn = document.querySelector('#ExpenseTypeSubmissionBtn');
    const BackBtn = document.querySelector('#TypeBackBtn');
    const typemonth = document.querySelector('#typemonth');
    const typeweek = document.querySelector('#typeweek');
    const typeDate = document.querySelector('#typeDate');
    const submitbtn = document.querySelector('#TypeSubmissionBtn');
    const heading = document.querySelector('#changing');
    let text;
    let input;

    ExpenseTypeBtn.addEventListener('click', function (e) {

        ExpenseType.classList.remove('active');
        ExpenseTypeconts.classList.remove('active');
        OkBtn.style.display = 'block';
        BackBtn.classList.remove('active');
        submitbtn.classList.remove('active');
        typeCat.style.display = 'block';
        typemonth.classList.remove('active');
        typeweek.classList.remove('active');
        typeDate.classList.remove('active');
        heading.innerHTML = "Select Expense Type";

    })


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

    BackBtn.addEventListener('click', function () {
        OkBtn.style.display = 'block';
        BackBtn.classList.remove('active');
        submitbtn.classList.remove('active');
        typeCat.style.display = 'block';
        typemonth.classList.remove('active');
        typeweek.classList.remove('active');
        typeDate.classList.remove('active');
        heading.innerHTML = "Select Expense Type";

    })

    function restoreBack() {
        ExpenseType.classList.remove('active');
        ExpenseTypeconts.classList.remove('active');
        BackBtn.classList.remove('active');
        submitbtn.classList.remove('active');


    }

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


                expenseList.forEach(function (expense) {

                    switch (typeCat.value) {

                        case 'Monthly Expense':

                            if (expense.category == "Home Expense" && expense.month == input[1] && expense.year == input[0]) {

                                He_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Transportation Expense" && expense.month == input[1] && expense.year == input[0]) {

                                Te_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Food Expense" && expense.month == input[1] && expense.year == input[0]) {

                                Fe_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "lend" && expense.month == input[1] && expense.year == input[0]) {

                                Le_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "borrow" && expense.month == input[1] && expense.year == input[0]) {

                                Bo_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "HealthCare Expense" && expense.month == input[1] && expense.year == input[0]) {

                                Hc_eamount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "PetCare Expense" && expense.month == input[1] && expense.year == input[0]) {

                                Cre_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Entertainment Expense" && expense.month == input[1] && expense.year == input[0]) {

                                Ot_amount += JSON.parse(expense.amount);
                            }

                            if (expense.category == "Child-related expenses" && expense.month == input[1] && expense.year == input[0]) {

                                Pe_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Others" && expense.month == input[1] && expense.year == input[0]) {

                                Ee_amount += JSON.parse(expense.amount);
                            }

                            break;

                        case 'Weekly Expense':


                            if (expense.category == "Home Expense" && expense.week == input[1] && expense.year == input[0]) {

                                He_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Transportation Expense" && expense.week == input[1] && expense.year == input[0]) {

                                Te_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Food Expense" && expense.week == input[1] && expense.year == input[0]) {

                                Fe_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "lend" && expense.week == input[1] && expense.year == input[0]) {

                                Le_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "borrow" && expense.week == input[1] && expense.year == input[0]) {

                                Bo_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "HealthCare Expense" && expense.week == input[1] && expense.year == input[0]) {

                                Hc_eamount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "PetCare Expense" && expense.week == input[1] && expense.year == input[0]) {

                                Cre_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Entertainment Expense" && expense.week == input[1] && expense.year == input[0]) {

                                Ot_amount += JSON.parse(expense.amount);
                            }

                            if (expense.category == "Child-related expenses" && expense.week == input[1] && expense.year == input[0]) {

                                Pe_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Others" && expense.week == input[1] && expense.year == input[0]) {

                                Ee_amount += JSON.parse(expense.amount);
                            }


                            break;

                        case 'Daily Expense':


                            if (expense.category == "Home Expense" && expense.date == typeDate.value) {

                                He_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Transportation Expense" && expense.date == typeDate.value) {

                                Te_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Food Expense" && expense.date == typeDate.value) {

                                Fe_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "lend" && expense.date == typeDate.value) {

                                Le_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "borrow" && expense.date == typeDate.value) {

                                Bo_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "HealthCare Expense" && expense.date == typeDate.value) {

                                Hc_eamount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "PetCare Expense" && expense.date == typeDate.value) {

                                Cre_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Entertainment Expense" && expense.date == typeDate.value) {

                                Ot_amount += JSON.parse(expense.amount);
                            }

                            if (expense.category == "Child-related expenses" && expense.date == typeDate.value) {

                                Pe_amount += JSON.parse(expense.amount);
                            }
                            if (expense.category == "Others" && expense.date == typeDate.value) {

                                Ee_amount += JSON.parse(expense.amount);
                            }


                            break;



                    }
                })


                // set the data
                var data = [
                    { x: "Home Expense", value: He_amount },
                    { x: "Transportation Expense", value: Te_amount },
                    { x: "Food Expense", value: Fe_amount },
                    { x: "lend", value: Le_amount },
                    { x: "borrow", value: Bo_amount },
                    { x: "HealthCare Expense", value: Hc_eamount },
                    { x: "PetCare Expense", value: Pe_amount },
                    { x: "Entertainment Expense", value: Ee_amount },
                    { x: "Child-related expenses", value: Cre_amount },
                    { x: "Others", value: Ot_amount },

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