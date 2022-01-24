class Staff {
    constructor(id, fullname, age, position, salary) {
        this.id = id;
        this.fullname = fullname;
        this.age = age;
        this.position = position;
        this.salary = salary;
    }
}

const create = () => {
    let fullname = document.getElementById('name').value
    let age = document.getElementById('age').value
    let position = document.getElementById('position').value
    let salary = document.getElementById('salary').value
    let staff = new Staff(-1, fullname, age, position, salary);
    if (fullname == "" || age == "" || position == "" || salary == "") {
        Swal.fire(
            'Ê?',
            'Rồi mắc gì kêu nhập cái bỏ trống vậy?',
            'question'
        )
        document.getElementById('name').value = "";
        document.getElementById('age').value = "";
        document.getElementById('position').value = "";
        document.getElementById('salary').value = "";
    }
    else {

        axios({
            url: "https://61ecf65cf3011500174d2259.mockapi.io/api/StaffmManage",
            method: "POST",
            data: staff
        }).then(
            (response) => {




                Swal.fire(
                    'Good job!',
                    'Thêm thành công ' + fullname + ' rồi nhen bé oiiii',
                    'success'
                )
                document.getElementById('name').value = "";
                document.getElementById('age').value = "";
                document.getElementById('position').value = "";
                document.getElementById('salary').value = "";
                retrive();

            }
        ).catch(
            (err) => {
                console.log(err);
            })

    }

}
const retrive = () => {
    axios({
        url: "https://61ecf65cf3011500174d2259.mockapi.io/api/StaffmManage",
        method: 'GET',

    }).then(
        (response) => {
            render(response.data)

        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
}


document.getElementById('add').addEventListener('click', () => {
    create();
}
)
const render = (data) => {
    const bodyTag = document.getElementById('body')
    let bodyInnerHTML = '';
    data.forEach((item) => {
        let { id, fullname, age, salary, position } = item;

        let itemHTML = `
        <tr>
        <th scope="row">${fullname}</th>
        <td>${age}</td>
        <td>${position}</td>
        <td>${salary}</td>
    </tr>
        `;
        bodyInnerHTML += itemHTML;



    }
    )
    bodyTag.innerHTML = bodyInnerHTML;
}


document.getElementById('search').addEventListener('input', (e) => {
    let keyWord = e.target.value;
    axios({
        url: "https://61ecf65cf3011500174d2259.mockapi.io/api/StaffmManage",
        method: 'GET',

    }).then(
        (response) => {
            let fullData = response.data;
            let dataFilter = fullData.filter(item => item.fullname.includes(keyWord));
            render(dataFilter)

        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )


})




retrive();
