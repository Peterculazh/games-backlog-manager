import React from 'react'
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { IColumn } from 'src/redux/reducers/games';
import '../../styles/components/SaveGame.sass';

interface IGameFormProps {
    columns: IColumn[]
}

let GameForm: React.FC<IGameFormProps & InjectedFormProps<{}, IGameFormProps>> = props => {
    const { handleSubmit, columns } = props;
    return <form onSubmit={handleSubmit} className="form-save-game">
        <div className="form-save-game-data">
            <Field name="name" component="input" type="text" />
            <Field name="column" component="select">
                {columns.map(column => <option value={column.id}>{column.name}</option>)}
            </Field>
        </div>
        <button type="submit">Submit</button>
    </form>
}

const ReduxGameForm = reduxForm<{}, IGameFormProps>({
    form: 'SaveGame'
})(GameForm)

export default connect(null)(ReduxGameForm);