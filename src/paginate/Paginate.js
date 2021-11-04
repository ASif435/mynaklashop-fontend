const paginate = (product)=>{
    const itemPerpage = 2;
    const pages = Math.ceil(product.length / itemPerpage);

    const newPages = Array.from({length:pages},(_,index)=>{
        const start = index *itemPerpage;
       return product.slice(start,start+itemPerpage)
    })
    return newPages;
}

export default paginate;