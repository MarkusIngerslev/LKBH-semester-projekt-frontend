export class ListRenderer {
    constructor(list, container, itemRenderer) {
        this.items = list;
        this.container = document.querySelector(container);
        this.itemRenderer = itemRenderer;
    }

    render() {
        this.container.innerHTML = "";
        for (const item of this.items) {
            const html = this.itemRenderer.render(item);
            this.container.insertAdjacentHTML("beforeend", html);

            if (this.itemRenderer.postRenderer) {
                const element = this.container.lastElementChild;
                const button = element.querySelector("#assign-btn"); //button id kan måske styres med parameter/argument så det kan genbruges...
                this.itemRenderer.postRenderer(button, item);
            }
        }
    }

    sort(sortBy, sortDir) {
        if (sortDir) {
            this.sortDir = sortDir;
        } else if (sortBy === this.sortBy) {
            if (this.sortDir === "asc") {
                this.sortDir = "desc";
            } else {
                this.sortDir = "asc";
            }
        } else {
            this.sortDir = "asc";
        }
        this.sortBy = sortBy;
        this.items.sort((a, b) => {
            if (this.sortDir === "asc") {
                if (a[this.sortBy] > b[this.sortBy]) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (a[this.sortBy] < b[this.sortBy]) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
        this.render();
    }
}
