import data from "./talks.json" with { type: "json" };

const parsed_data = data.talks;
const length = Object.keys(parsed_data).length;

const curr_date = new Date();
curr_date.setHours(0, 0, 0, 0);

const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const this_term_div = document.getElementById("this-term");

let curr = 0;

let title = parsed_data[curr].title;
let date = parsed_data[curr].date;
let location = parsed_data[curr].location;

const [day_str, month_str, year_str] = date.split(" ");
const day = parseInt(day_str);
const month = months.indexOf(month_str);
const year = parseInt(year_str);

const event_date = new Date(year, month, day);
event_date.setHours(0, 0, 0, 0);

const diff_ms = event_date - curr_date;
const diff_days = diff_ms / (1000 * 60 * 60 * 24);

let state = "";

if (diff_days < 0) {
    state = "Past";
}

else if (diff_days < 1) {
    state = "Today";
}

else if (diff_days < 7) {
    state = "This Week";
}

else {
    state = "Upcoming";
}

let next_button = document.createElement("div");
next_button.classList.add("next-button");

let next_icon = document.createElement("p");
next_icon.innerText = ">";
next_icon.classList.add("next-icon");

let event_div = document.createElement("div");
event_div.classList.add("event-div");

let top_div = document.createElement("div");
top_div.classList.add("top-div");

let state_text = document.createElement("p");
state_text.innerText = state;
state_text.classList.add("state-text");

let date_text = document.createElement("p");
date_text.innerText = date;
date_text.classList.add("date-text");

let title_text = document.createElement("p");
title_text.innerText = title;
title_text.classList.add("title-text");

let location_text = document.createElement("p");
location_text.innerText = `Location: ${location}`;
location_text.classList.add("location-text");

top_div.appendChild(state_text);
top_div.appendChild(date_text);

event_div.appendChild(top_div);

event_div.appendChild(title_text);
event_div.appendChild(location_text);

next_button.appendChild(next_icon);

this_term_div.appendChild(event_div);
this_term_div.appendChild(next_button);

function render_event() {
    let title = parsed_data[curr].title;
    let date = parsed_data[curr].date;
    let location = parsed_data[curr].location;

    const [day_str, month_str, year_str] = date.split(" ");
    const day = parseInt(day_str);
    const month = months.indexOf(month_str);
    const year = parseInt(year_str);

    const event_date = new Date(year, month, day);
    event_date.setHours(0, 0, 0, 0);

    const diff_ms = event_date - curr_date;
    const diff_days = diff_ms / (1000 * 60 * 60 * 24);

    let state = "";

    if (diff_days < 0) {
        state = "Past";
    }

    else if (diff_days === 0) {
        state = "Today";
    }

    else if (diff_days < 7) {
        state = "This Week";
    }

    else {
        state = "Upcoming";
    }

    state_text.innerText = state;
    date_text.innerText = date;
    title_text.innerText = title;
    location_text.innerText = `Location: ${location}`;
}

next_button.addEventListener("pointerdown", (e) => {
    if (curr < length - 1) {
        curr += 1;
    }

    else {
        curr = 0;
    }

    render_event();
});