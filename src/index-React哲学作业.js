import React from 'react';
import ReactDOM from 'react-dom';
// 基础数据
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

// 搜索栏
const SearchBar = ({
  filterText,
  setFilterText,
  inStockOnly,
  setInStockOnly
}) => {

  const handleSearchChange = (e) => {
    setFilterText(e.target.value);
  }

  const handleStockChange = (value) => {
    setInStockOnly(value);
  }
  return (
    <div>
      <input
        type="text"
        placeholder='search...'
        value={filterText}
        onChange={handleSearchChange} />
      <div>
        <input
          type='checkbox'
          width='30'
          value={inStockOnly}
          onChange={handleStockChange}
        />
        Only show products in stock
      </div>
    </div>
  )
}
// 列表每一个分类的分类名称
const ProductCategoryRow = ({category}) => {
  return (
    <tr>
      <td>{category}</td>
    </tr>
  );
}
// 列表每一个分类的分类产品
const ProductRow = ({product}) => {
  const name = product.stocked ? (product.name) : (
    <span style={{color: 'red'}}>{product.name}</span>
  )
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

// 产品列表
const ProductTable = ({
  products,
  filterText,
  inStockOnly,
}) => {
  const rows = [];
  let lastCategory;

  products.forEach((pro) => {
    if(pro.name.indexOf(filterText) === -1) {
      return;
    }
    if(inStockOnly && !pro.stocked) {
      return;
    }
    if(pro.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow 
          category={pro.category}
          key={pro.category}
        />
      );
    }
    rows.push(
      <ProductRow 
        product={pro}
        key={pro.name}
      />
    )
    lastCategory = pro.category;
  })
  
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

// 最外面的 outer
const FilterableProductTable = () => {
  const [filterText, setFilterText] = React.useState("");
  const [inStockOnly, setInStockOnly] = React.useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        setFilterText={setFilterText}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />
      <ProductTable
        products={PRODUCTS}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  )
}
// class FilterableProductTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchWord: '',
//       checked: false,
//     };
//   }

//   // 改变 input 的 value 值的方法
//   onChangeValue(newValue) {
//     this.state.searchWord = newValue;
//   }

//   render() {
//     return (
//       <div>
//         <SearchBar
//           value={this.state.searchWord}
//           onChangeValue={this.onChangeValue}/>
//         <ProductTable products={PRODUCTS} />
//       </div>
//     );
//   }
// }

ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('root')
)