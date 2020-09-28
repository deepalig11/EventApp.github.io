export function getData() {
    const list = JSON.parse(localStorage.getItem('elist'));
    console.log("chala redux me");
    if (list !== null)
        return {
            type: "Get_Data",
            getData: list
        }
    else return {
        type: "Get_Data",
        getData: null
    }
}

export function setData(list1) {

    localStorage.setItem('elist', JSON.stringify(list1));
    console.log(list1);
    return {
        type: "Set_Data",
        setData: list1
    }
}

export function filterData(list1) {

    // localStorage.setItem('elist', JSON.stringify(list1));
    console.log(list1);
    return {
        type: "Filter_Data",
        filterData: list1
    }
}

