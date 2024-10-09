import React from 'react';

import {
    Button,
    Headline,
    List,
    Modal,
    Placeholder,
} from '@telegram-apps/telegram-ui';

import style from './style.module.scss';

// Интерфейс для описания данных пользователя
interface User {
    id: number;
    name: string;
    ticketCount: number;
    addFunction: () => void;
    removeFunction: () => void;
}

// Пропсы для компонента UserList
interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <List className={style.list}>
            {users.map((user) => (
                <div key={user.id} className={style.user}>
                    <Headline plain weight="2" className={style.user__name}>
                        {user.name}
                    </Headline>

                    <Modal
                        header={<Modal.Header>FAQ</Modal.Header>}
                        trigger={
                            <Button className={style.user__button} size="s">
                                выбор
                            </Button>
                        }
                    >
                        <Placeholder
                            header={user.name}
                            description={
                                <>
                                    <header>{`всего билетов: ${user.ticketCount}`}</header>
                                    <Button className={style.user__modal}>
                                        Добавить
                                    </Button>
                                    <Button>Забрать</Button>
                                </>
                            }
                        ></Placeholder>
                    </Modal>
                </div>
            ))}
        </List>
    );
};

export default UserList;
