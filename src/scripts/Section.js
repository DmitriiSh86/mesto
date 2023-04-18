class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    };
    
    addItem(element) {
        this._containerSelector.prepend(element);
    };
    
    renderItem() {
        this._renderer(cardData);
    };

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    };
};

export {Section}