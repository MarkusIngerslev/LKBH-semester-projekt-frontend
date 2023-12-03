import { requestedShiftsList } from "./main.js";

export class AdminAvaliableShiftRenderer {
    render(shift) {
        const convertedShiftStart = convertTo24HourFormat(shift.ShiftStart);
        const convertedShiftEnd = convertTo24HourFormat(shift.ShiftEnd);
        const formattedDate = formatShiftDate(shift.Date);
        const requestedBy = getFullNameOfInterested(shift);

        const html = /*html*/ `
        <tr>
            <td>${formattedDate}</td>
            <td>${convertedShiftStart} - ${convertedShiftEnd}</td>
            <td>${requestedBy}</td>
            <td><button class="btnStyling">Tildel vagt</button></td>
        </tr>
        `;

        return html;
    }
}


// returnere navne på de vikarer der har vist interesse i en vagt
function getFullNameOfInterested(shift) {
    const requestedShift = requestedShiftsList.find((item) => item.ShiftID === shift.ShiftID);

    if (requestedShift.FirstName && requestedShift.LastName) {
        let fullNames = [];

        for (let i = 0; i < requestedShift.FirstName.length; i++) {
            fullNames.push(`- ${requestedShift.FirstName[i]} ${requestedShift.LastName[i]}`);
        }

        return fullNames.join("<br>");
    } else {
        return "Ingen anmodninger/bud";
    }
}

// Function to convert ISO date and time to 24-hour format
function convertTo24HourFormat(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

// Shift/vagt dato property bliver lavet om til dansk dato format
function formatShiftDate(dateString) {
    const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("da", options);
}
