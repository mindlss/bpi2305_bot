import { useEffect, useState, type FC } from 'react';
import { useInitData, useLaunchParams } from '@telegram-apps/sdk-react';
import {
    Button,
    Headline,
    List,
    Modal,
    Placeholder,
} from '@telegram-apps/telegram-ui';

import style from './style.module.scss';
import sad from './sad.gif';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    tickets: number;
    isAdmin: boolean;
    _key: string;
}

const baseUrl = 'http://localhost:3000/api';

export const AdminPage: FC = () => {
    const navigate = useNavigate();
    const initDataRaw = useLaunchParams().initDataRaw;
    const initData = useInitData();
    const id = initData?.user?.id ?? undefined;

    if (!id) {
        return <img src={sad} className={style.gif} />;
    }

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await fetch(`${baseUrl}/users/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                if (!data.isAdmin) {
                    navigate('/');
                }

            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                const data = await response.json();
                const filteredUsers = data.filter((user: User) => !user.isAdmin);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        
        checkAdmin();
        fetchData();
    }, [baseUrl]);    

    const givePass = async (id: number) => {
        const response = await fetch(baseUrl + `/users/${id}/tickets/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hash: initDataRaw,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, tickets: data.user.tickets } : user
                )
            );
            // success
        } else {
            // error
            console.error('Error giving pass:', data);
        }
    };

    const removePass = async (id: number) => {
        const response = await fetch(baseUrl + `/users/${id}/tickets/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hash: initDataRaw,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, tickets: data.user.tickets } : user
                )
            );
            // success
        } else {
            // error
            console.error('Error taking pass:', data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                console.log(data)

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [baseUrl]);

    return (
        <>
            <List className={style.list}>
                {users.map((user) => (
                    <div key={user.id} className={style.user}>
                        <Headline plain weight="2" className={style.user__name}>
                            {`${user.firstName} ${user.lastName}`}
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
                                header={`${user.firstName} ${user.lastName}`}
                                description={
                                    <>
                                        <header>{`всего билетов: ${user.tickets}`}</header>
                                        <Button
                                            className={style.user__modal}
                                            onClick={() => givePass(user.id)}
                                        >
                                            Добавить
                                        </Button>
                                        <Button
                                            onClick={() => removePass(user.id)}
                                        >
                                            Забрать
                                        </Button>
                                    </>
                                }
                            ></Placeholder>
                        </Modal>
                    </div>
                ))}
            </List>
        </>
    );
}    