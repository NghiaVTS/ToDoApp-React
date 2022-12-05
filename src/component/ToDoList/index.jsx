import React, { useState } from 'react'
import styled from 'styled-components'

const ToDoListStyle = styled.div`
    .input-group{
        display: flex;
        border: 1px solid #ccc;
        height: 40px;
        input{
            flex: 1;
            padding: 0 10px;
            outline: none;
            border: none !important;
        }

        button{
            background: #ccc;
            padding: 0 10px;
            border: none !important;
            cursor: pointer;
            &:disabled{
                opacity: 0.2;
                cursor: no-drop;
            }
        }
    }
    .list-board{
        display: flex;
        gap: 30px;
        .board{
            
            flex: 1;
            .title{
                font-size: 30px;
                margin: 20px 0 20px 0;
                font-weight: bold;
            }
            .items{
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
        }
    }

`

export const ToDoList = ({ toDoList, onAdd, onCompleted }) => {

    const [value, setValue] = useState('')

    const _onAdd = () => {
        onAdd(value.trim())
        setValue('')
    }

    const onKeyUp = (ev) => {
        if (ev.key === 'Enter' && value.trim() !== '') {
            _onAdd()
        }
    }

    const listDoing = toDoList.filter(e => !e.isCompleted)
    const listDone = toDoList.filter(e => e.isCompleted)

    return (
        <ToDoListStyle>
            <div className="input-group">
                <input onKeyUp={onKeyUp} value={value} onChange={ev => setValue(ev.target.value)} placeholder='Job.....' />
                <button disabled={!value.trim()} onClick={_onAdd}>Add</button>
            </div>
            <div className="list-board">
                <div className="board">
                    <div className="title">Doing Job</div>
                    <div className="items">
                        {
                            listDoing.map(e => <ToDoItem onCompleted={onCompleted} key={e.id} {...e} />)
                        }
                    </div>
                </div>
                <div className="board">
                    <div className="title">Done Job</div>
                    <div className="items">
                        {
                            listDone.map(e => <ToDoItem key={e.id} {...e} />)
                        }
                    </div>
                </div>
            </div>
        </ToDoListStyle>
    )
}

const ToDoItemStyle = styled.div`
    display: flex;
    border: 1px solid gray;
    padding: 0 10px;
    .name {
        flex: 1;
    }
    button{
        margin: 3px 0;
        border: 1px solid gray;
        padding: 0 10px;
        background: gray;
        cursor: pointer;
    }

    &.isCompleted{
        background: #eee;
        button{
            display: none;
        }
        .name{
            text-decoration: line-through;
        }
    }
`

const ToDoItem = ({ id, name, isCompleted, onCompleted }) => {
    return (
        <ToDoItemStyle className={isCompleted ? 'isCompleted' : ''}>
            <div className="name">{name}</div>
            <button onClick={() => onCompleted(id)}>✓</button>
        </ToDoItemStyle>
    )
}