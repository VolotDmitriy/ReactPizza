import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = ({ text }: { text: string }) => {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>
                <span className={styles.icon}>😕</span>
                <br />
                {text}
            </h1>
            <p className={styles.description}>
                Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
                заказать пиццу, перейди на главную страницу.
            </p>
        </div>
    );
};

export default NotFoundBlock;
