import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useInitData,
    useLaunchParams,
} from '@telegram-apps/sdk-react';
import { Button, Input, Modal, Placeholder } from '@telegram-apps/telegram-ui';

import hi from './hi.gif';
import style from './style.module.scss';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const RegistrationPage: FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();

    const initDataRaw = useLaunchParams().initDataRaw;
    const initData = useInitData();
    const id = initData?.user?.id ?? undefined;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/users/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [baseUrl, id]);

    const addUser = async () => {
        if (firstName === '' || lastName === '' || !id) {
            return;
        }
        const response = await fetch(baseUrl + '/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hash: initDataRaw,
                id: id,
                firstName: firstName,
                lastName: lastName,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setTimeout(() => {
                navigate('/');
            }, 250);
        } else {
            console.error('Error adding user:', data);
        }
    };

    return (
        <>
            <img src={hi} className={style.gif} />
            <Placeholder description="Впиши свои настоящие имя и фамилию, так старосте будет проще тебя найти."></Placeholder>

            <Modal
                trigger={
                    <Button mode="bezeled" size="m" className={style.button}>
                        Начать
                    </Button>
                }
            >
                <Placeholder
                    description={
                        <>
                            <Input
                                status="focused"
                                header="Имя"
                                onChange={(e) => setFirstName(e.target.value)}
                            ></Input>
                            <Input
                                status="focused"
                                header="Фамилия"
                                onChange={(e) => setLastName(e.target.value)}
                            ></Input>
                            <Button
                                mode="bezeled"
                                size="m"
                                onClick={async () => await addUser()}
                            >
                                Зарегистрироваться
                            </Button>
                        </>
                    }
                ></Placeholder>
            </Modal>
        </>
    );
};
