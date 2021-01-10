import React from 'react'
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { IColumn } from 'src/redux/reducers/games';
import { RootState } from 'src/redux/store';
import '../../styles/components/SaveGame.sass';

interface IGameFormProps {
    columns: IColumn[]
}

const sortColumnsById = (columnA: IColumn, columnB: IColumn) => {
    if (columnA.id > columnB.id) {
        return 1;
    } else if (columnA.id < columnB.id) {
        return -1;
    } else {
        return 0;
    }
}

let GameForm: React.FC<IGameFormProps & InjectedFormProps<{}, IGameFormProps>> = props => {
    const { handleSubmit, columns } = props;
    const sortedColumns = columns.slice().sort(sortColumnsById);
    return <form onSubmit={handleSubmit} className="form-save-game">
        <div className="form-save-game-data">
            <Field name="name" component="input" type="text" />
            <Field name="column" component="select" value={sortedColumns[0].id}>
                {sortedColumns.map(column => <option key={column.id} value={column.id}>{column.name}</option>)}
            </Field>
        </div>
        <button type="submit">Submit</button>
    </form>
}

const ReduxGameForm = reduxForm<{}, IGameFormProps>({
    form: 'SaveGame',
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    updateUnregisteredFields: true
})(GameForm);

const mapStateToProps = (state: RootState) => {
    const sortedColumns = state.gameManager.columns.slice().sort(sortColumnsById);
    return {
        initialValues: {
            column: sortedColumns[0].id,
        },
        columns: sortedColumns
    }
};

export default connect(mapStateToProps)(ReduxGameForm);