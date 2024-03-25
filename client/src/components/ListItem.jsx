import { useState } from 'react';
import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';
import Modal from './Modal';
import '../styles/App.css';
import '../styles/ListItem.css';

function ListItem({ task, getData }) {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVERURL}/todos/${task.id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='listItem-container'>
      <div className='wrapper'>
        <div className='info-container'>
          <TickIcon />
          <p className='task-title'>{task.title}</p>
        </div>
        <div className='progressBar-container'>
          <ProgressBar progress={task.progress} />
        </div>
        <div className='button-container'>
          <button className='edit-button' onClick={() => setShowModal(true)}>
            Edit
          </button>
          <button className='delete-button' onClick={deleteItem}>
            Delete
          </button>
        </div>
        {showModal && (
          <Modal
            mode={'edit'}
            setShowModal={setShowModal}
            task={task}
            getData={getData}
          />
        )}
      </div>
    </div>
  );
}

export default ListItem;
