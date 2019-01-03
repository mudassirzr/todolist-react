import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/bootstrap.css';
// import App from './App';
//import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));


/*
Todo app structure

TodoApp
	- TodoHeader
	- TodoList
    - TodoListItem #1
		- TodoListItem #2
		  ...
		- TodoListItem #N
	- TodoForm
*/
var todoItems = [];
todoItems.push({index: 1, value: "learn react", done: false, createdDate: new Date(), completedDate: new Date()});
todoItems.push({index: 2, value: "Go shopping", done: true, createdDate: new Date(), completedDate: new Date()});
todoItems.push({index: 3, value: "buy flowers", done: true, createdDate: new Date(), completedDate: new Date()});
// console.log(todoItems);
class TodoList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
    	<div className="todo-list">
    	<h2>Your ToDo List</h2>
    	<div className="filter-block">
    		<label>Filter By</label>
    		<div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
			  <button type="button" className="btn btn-secondary" onClick={this.props.sortCreatedOld}>Created (Oldest)</button>
			  <button type="button" className="btn btn-secondary" onClick={this.props.sortCreatedNew}>Created (Latest)</button>
			  <button type="button" className="btn btn-secondary" onClick={this.props.sortCompletedOld}>Completed (Oldest)</button>
			  <button type="button" className="btn btn-secondary" onClick={this.props.sortCompletedNew}>Completed (Latest)</button>
			</div>
    	</div>
      	<ul className="list-group"> {items} </ul>
      	</div>
    );
  }
}
  
class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    return(
      <li className="list-group-item ">
        <div className={todoClass}>
          <button className="check" onClick={this.onClickDone} title="Mark as done"> &#10004;</button>
          {this.props.item.value}
          <button type="button" className="close" onClick={this.onClickClose} title="Delete Task">&times;</button>
        </div>
      </li>     
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit}>
        <div className="input-group mb-3">
			<input 
				type="text"
				ref="itemName"
				className="form-control todo-input" 
				placeholder="Enter your todo"
			/>
			<div className="input-group-append">
				<button className="btn btn-success" type="submit">Add</button>
			</div>
		</div>
      </form>
    );   
  }
}
  
class TodoHeader extends React.Component {
  render () {
    return <h1>ToDo App</h1>;
  }
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.sortCreatedOld = this.sortCreatedOld.bind(this);
    this.sortCreatedNew = this.sortCreatedNew.bind(this);
    this.sortCompletedOld = this.sortCompletedOld.bind(this);
    this.sortCompletedNew = this.sortCompletedNew.bind(this);
    this.displayJSON = this.displayJSON.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
    	todoItems: todoItems,
    };
  }
  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
      done: false,	
      createdDate: new Date(),
      completedDate: null
    });
    //console.log(todoItems);
    this.setState({todoItems: todoItems});
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    // todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    if(todo.done){
    	todo.completedDate = new Date();
    	todoItems.push(todo);
    } else {
    	todo.completedDate = null;
    	todoItems.unshift(todo)
    }
    // console.log(todoItems);
    this.setState({todoItems: todoItems});
  }
  sortCreatedOld () {
  	this.state.todoItems.sort((a,b)=>a.createdDate>b.createdDate);
  	// console.log(todoItems);
  	this.setState({todoItems:todoItems});
  }
  sortCreatedNew () {
  	this.state.todoItems.sort((a,b)=>a.createdDate<b.createdDate);
  	// console.log(todoItems);
  	this.setState({todoItems:todoItems});
  }
  sortCompletedOld () {
  	this.state.todoItems.sort((a,b)=>a.completedDate>b.completedDate);
  	// console.log(todoItems);
  	this.setState({todoItems:todoItems});
  }
  sortCompletedNew () {
  	this.state.todoItems.sort((a,b)=>a.completedDate<b.completedDate);
  	// console.log(todoItems);
  	this.setState({todoItems:todoItems});
  }
  componentDidMount() {
    this.refs.jsonValue.focus();
  }
  displayJSON () {
  	// console.log(JSON.stringify(this.state.todoItems));
  	this.refs.jsonValue.value = JSON.stringify(this.state.todoItems);
  }
  handleSubmit (event) {
  	event.preventDefault();
    var todoNew = JSON.parse(this.refs.jsonValue.value);
    if (todoNew){
	    todoItems.splice(0,todoItems.length);
	    todoItems.push(...todoNew);
	    this.setState({todoItems:todoItems});
	    this.refs.jsonForm.reset();
    }
  	// var todoUpdate = JSON.parse(event.target.value);
  	// this.setState({todoItems: todoUpdate});
  }
  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoForm addItem={this.addItem} />
      	<TodoList 
      		items={this.props.initItems} 
      		removeItem={this.removeItem} 
      		markTodoDone={this.markTodoDone} 
      		sortCreatedOld={this.sortCreatedOld} 
      		sortCreatedNew={this.sortCreatedNew} 
      		sortCompletedOld={this.sortCompletedOld}
      		sortCompletedNew={this.sortCompletedNew}
      	/>
      	<div className="json-area">
      		<h3 className="text-center">JSON Area</h3>
	      	<button className="btn btn-sm btn-primary" onClick={this.displayJSON}>Display JSON</button>
	      	<form ref="jsonForm" onSubmit={this.handleSubmit}>
	      		<textarea id="jsonarea" placeholder="JSON Value goes here" ref="jsonValue"/>
	      		<button className="btn btn-danger" type="submit">Update JSON</button>
	      	</form>
      	</div>
      </div>
    );
  }
}

ReactDOM.render(<TodoApp initItems={todoItems}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
