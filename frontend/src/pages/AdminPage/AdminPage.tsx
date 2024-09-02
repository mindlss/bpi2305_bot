import { type FC } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import {
    Button,
    Headline,
    List,
    Modal,
    Placeholder,
} from '@telegram-apps/telegram-ui';
// import { Link } from '@/components/Link/Link.tsx';

import style from './style.module.scss';

export const AdminPage: FC = () => {
    const initDataRaw = useLaunchParams().initDataRaw;

    return (
        <>
            <List className={style.list}>
                <div className={style.user}>
                    <Headline plain weight="2" className={style.user__name}>
                        Антон Архипов
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
                            header={'Антон Архипов'}
                            description={
                                <>
                                    <header>{'всего билетов: 2'}</header>
                                    <Button className={style.user__modal}>
                                        Добавить
                                    </Button>
                                    <Button>Забрать</Button>
                                </>
                            }
                        ></Placeholder>
                    </Modal>
                </div>
            </List>
        </>
    );
};
