export const dateModified = (date) => {
    const options = {
        days: "2-digit",
        month: "long",
        year: "numeric"
    }
    const res = new Date(date).toLocaleDateString("fa-IR", options)
    return res;
}