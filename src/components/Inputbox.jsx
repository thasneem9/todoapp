import { useState } from 'react';
import styles from './inputbox.module.css';

export default function Inputbox() {
    const [text, setText] = useState("");
    const [unstruckItems, setUnstruckItems] = useState([]);
    const [struckItems, setStruckItems] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (text.trim() !== "") {
            setUnstruckItems([...unstruckItems, text]);
            setText("");
            setIsExpanded(false);
        }
    }

    function handleDelete(item, struck) {
        if (struck) {
            setStruckItems(struckItems.filter((i) => i !== item));
        } else {
            setUnstruckItems(unstruckItems.filter((i) => i !== item));
        }
    }

    function strike(item, index, struck) {
        if (struck) {
            setStruckItems(struckItems.filter((i) => i !== item));
            setUnstruckItems([...unstruckItems, item]);
        } else {
            setUnstruckItems(unstruckItems.filter((i) => i !== item));
            setStruckItems([...struckItems, item]);
        }
    }

    const tasksLeft = unstruckItems.length;
    const completedTasks = struckItems.length;

    return (
        <div className={styles.container}>
            {!isExpanded ? (
                <button onClick={() => setIsExpanded(true)} className={styles.expandButton}>Add Item</button>
            ) : (
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input 
                            className={styles.formInput} 
                            placeholder="Add Item" 
                            type="text" 
                            value={text} 
                            onChange={handleChange}
                            autoFocus
                        />
                        <button className={styles.formButton} type="submit">Add</button>
                    </form>
                </div>
            )}

            <div className={styles.items}>
                {[...unstruckItems, ...struckItems].map((item, index) => {
                    const struck = struckItems.includes(item);
                    return (
                        <ul key={index}>
                            <li 
                                onClick={() => strike(item, index, struck)}
                                className={struck ? styles.struck : ''}
                            >
                                {item} 
                                <button 
                                    className={styles.deleteButton} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item, struck);
                                    }}
                                >
                                    x
                                </button>
                            </li>
                        </ul>
                    );
                })}
            </div>

            <div className={styles.status}>
                <p>Tasks left: {tasksLeft}</p>
                <p>Completed tasks: {completedTasks}</p>
            </div>
        </div>
    );
}
