import { useEffect, useState, type FC } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    Modal,
    Placeholder,
    Button,
    Blockquote,
    Input,
} from '@telegram-apps/telegram-ui';

import sad from './sad.gif';
import pass from './pass.gif';
import question from './question.webp';
import cart from './cart.gif';
import style from './style.module.scss';
import { useInitData, useLaunchParams } from '@telegram-apps/sdk-react';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const IndexPage: FC = () => {
    const navigate = useNavigate();
    const initDataRaw = useLaunchParams().initDataRaw;
    const initData = useInitData();
    const id = initData?.user?.id ?? undefined;

    if (!id) {
        return <img src={sad} className={style.gif} />;
    }

    const [tickets, setTickets] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/users/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    navigate('/registration-page');
                }

                const data = await response.json();

                if (data.isAdmin) {
                    navigate('/admin-page');
                }

                setTickets(data.tickets);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [baseUrl, id]);

    const buyPass = async (message: string) => {
        if (tickets == 0 || tickets < 0) {
            // Анимация ошибки
            setMessage('');
            return;
        }
        const response = await fetch(baseUrl + `/users/${id}/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hash: initDataRaw,
                message: message,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setTickets(tickets - 1);
            setMessage('');
        } else {
            // Анимация ошибки
            setMessage('');
            console.error('Error buying pass:', data);
        }
    };

    function getTicketLabel(count: number) {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return `${count} билетов! 🥳`;
        }

        if (count == 0) {
            return `${count} билетов(`;
        }

        switch (lastDigit) {
            case 1:
                return `${count} билет! 🥳`;
            case 2:
            case 3:
            case 4:
                return `${count} билета! 🥳`;
            default:
                return `${count} билетов! 🥳`;
        }
    }

    return (
        <>
            <img src={tickets == 0 ? sad : pass} className={style.gif} />
            <Placeholder
                header={`У вас ${getTicketLabel(tickets)}`}
            ></Placeholder>
            <Modal
                header={<Modal.Header>Покупка</Modal.Header>}
                trigger={
                    <Button
                        mode="bezeled"
                        size="s"
                        className={style.button}
                        disabled={tickets == 0}
                    >
                        Потратить билет 🛒
                    </Button>
                }
            >
                <Placeholder
                    description={
                        <>
                            <Input
                                status="focused"
                                header="Лекция и дата"
                                onChange={(e) => setMessage(e.target.value)}
                            ></Input>
                            <Modal.Close>
                                <Button
                                    mode="bezeled"
                                    size="m"
                                    className={style.button__buy}
                                    onClick={() => buyPass(message)}
                                >
                                    Потратить билет 🛒
                                </Button>
                            </Modal.Close>
                        </>
                    }
                >
                    <img
                        alt="Telegram sticker"
                        src={cart}
                        style={{
                            display: 'block',
                            height: '144px',
                            width: '144px',
                        }}
                    />
                </Placeholder>
            </Modal>
            <Modal
                header={<Modal.Header>FAQ</Modal.Header>}
                trigger={
                    <Placeholder
                        description="Как получить билет?"
                        className={style.bottom}
                    ></Placeholder>
                }
            >
                <Placeholder
                    description={
                        <Blockquote type="text">
                            Билеты выдаются за заслуги, проявленные инициативы,
                            и массовые рассылки готовых дз или лаб, а так же за
                            хорошую посещаемость.
                        </Blockquote>
                    }
                >
                    <img
                        alt="Telegram sticker"
                        src={question}
                        style={{
                            display: 'block',
                            height: '144px',
                            width: '144px',
                        }}
                    />
                </Placeholder>
            </Modal>
        </>
    );
};
