const PersonForm = (props) => {
    return (
      <div>
        <form onSubmit={props.addPerson}>
          <div>
            name: <input
            id="nameField"
            value={props.newName} 
            onChange={props.handleNameChange}
            />
          </div>
          <div>
            number: <input
            id="numberField"
            value={props.newNumber}
            onChange={props.handleNumberChange}
            />
          </div>
          <div><button id="add-button" type="submit">add</button></div>
        </form>
      </div>
    )
}

export default PersonForm