function sorting(arr: any[], field: string, order: number) {

    return arr.sort((a, b) => {
        let fieldA = order === 1 ? a[field] : b[field]
        let fieldB = order === 1 ? b[field] : a[field]

        if (fieldA > fieldB) {
            return 1
        } else if (fieldB > fieldA) {
            return -1
        } else {
            return 0
        }
    })
}

export default sorting