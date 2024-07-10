import classes from './ChatSkeleton.module.css';

function ChatSkeleton() {
    return (
      <div className={classes.chat}>
        <div className={classes.avatar}></div>
        <div className={classes.content}>
          <p className={classes.name}></p>
          <p className={classes.message}></p>
        </div>
      </div>
    );
}

export default ChatSkeleton;