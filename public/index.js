const socket = io();
let outputDataOld = {};
const notifications = document.querySelector(".notifications");
socket.on("outputchanged", function (outputData) {
    //to show the data
    if(Object.keys(outputData).length === 0)
    document.querySelector("#listener").innerHTML = 'كله تمام يا ريس!!';
    else if(JSON.stringify(outputDataOld) !== JSON.stringify(outputData)){
        console.log('outputchanged', outputData);
        //basic list:
        let html = "<ol>";
        Object.entries(outputData).forEach(
            ([key, value]) => {
                const name = key.split('::')[0];
                html += `<li>اسم: ${name} --- ${value}</li>`
                // create toast for new names only
                if( !(key in outputDataOld) ) {
                    createToast(`اسم: ${name} --- ${value}`);
                }
            }   
            );
        html += "</ol>";
        document.querySelector("#listener").innerHTML = html;

        // update the global output variable 
        outputDataOld = outputData;
    }
});
  


const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}

const createToast = (text) => {
    // Getting the icon and text for the toast based on the id passed
    const icon = 'fa-circle-xmark';
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast error`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
                      
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), 5000);

    notifications.appendChild(toast); // Append the toast to the notification ul
}

