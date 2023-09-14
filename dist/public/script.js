
const STATUS = {
    Offline: {
        id: 0,
        text: 'Offline',
        class: 'bg-danger'
    },
    Online: {
        id: 1,
        text: 'Online',
        class: 'bg-warning'
    },
    Connected: {
        id: 2,
        text: 'Connected',
        class: 'bg-success'
    },
    Loading: {
        id: 3,
        text: 'Loading',
        class: 'bg-secondary'
    }
}

function setStatus(status_id) {
    const status = Object.values(STATUS).find((status) => status.id === status_id);
    document.title = `OSCMorse - ` + status.text;
    document.getElementById('status').innerHTML = status.text;
    for (const status of Object.values(STATUS))
        document.getElementById('status').classList.remove(status.class);
    document.getElementById('status').classList.add(status.class);
}

function setOutCase(cases) {
    for (const { in: input, out: output, name, id } of cases.map((e, i) => Object.assign(e, { id: i }))) {
        var element = document.getElementById("out_" + id);
        if (!element) {
            element = document.createElement('div')
            element.id = "out_" + id;
            element.classList.add('col', 'text-center', 'py-4', 'border', 'rounded');
            document.getElementById('out_group').appendChild(element);
        }
        element.classList.remove('bg-success', 'bg-danger');
        element.classList.add(output ? 'bg-success' : 'bg-secondary');

    }
}
function setInCase(cases) {
    for (const { in: input, out: output, name, id } of cases.map((e, i) => Object.assign(e, { id: i }))) {
        var element = document.getElementById("in_" + id);
        if (!element) {
            element = document.createElement('div')
            element.id = "in_" + id;
            element.classList.add('col', 'text-center', 'py-4', 'border', 'rounded');
            document.getElementById('in_group').appendChild(element);
        }
        element.classList.remove('bg-success', 'bg-danger');
        element.classList.add(input ? 'bg-success' : 'bg-secondary');

    }
}


window.addEventListener('load', () => {
    const cases = [
        { in: true, out: true, name: 'Hact_Morse/0' },
        { in: false, out: true, name: 'Hact_Morse/1' },
        { in: true, out: false, name: 'Hact_Morse/2' },
        { in: true, out: false, name: 'Hact_Morse/3' },
        { in: false, out: false, name: 'Hact_Morse/4' },
        { in: true, out: false, name: 'Hact_Morse/5' },
        { in: false, out: false, name: 'Hact_Morse/6' },
    ]

    setOutCase(cases);
    setInCase(cases);
    setStatus(STATUS.Offline.id);


});