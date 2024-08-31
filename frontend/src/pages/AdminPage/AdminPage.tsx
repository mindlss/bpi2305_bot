import { type FC, useMemo } from 'react';
import { useInitData, useLaunchParams, type User } from '@telegram-apps/sdk-react';
import {
    Button,
    Input,
    List,
    Modal,
    Placeholder
} from '@telegram-apps/telegram-ui';
// import { Link } from '@/components/Link/Link.tsx';

import style from './style.module.scss';

import {
    DisplayData,
    type DisplayDataRow,
} from '@/components/DisplayData/DisplayData.tsx';

function getUserRows(user: User): DisplayDataRow[] {
    return [
        { title: 'id', value: user.id.toString() },
        { title: 'username', value: user.username },
        { title: 'photo_url', value: user.photoUrl },
        { title: 'last_name', value: user.lastName },
        { title: 'first_name', value: user.firstName },
        { title: 'is_bot', value: user.isBot },
        { title: 'is_premium', value: user.isPremium },
        { title: 'language_code', value: user.languageCode },
        { title: 'allows_to_write_to_pm', value: user.allowsWriteToPm },
        {
            title: 'added_to_attachment_menu',
            value: user.addedToAttachmentMenu,
        },
    ];
}

export const AdminPage: FC = () => {
    const initData = useInitData();

    const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
        return initData && initData.user
            ? getUserRows(initData.user)
            : undefined;
    }, [initData]);

    const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
        return initData && initData.receiver
            ? getUserRows(initData.receiver)
            : undefined;
    }, [initData]);

    const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
        if (!initData?.chat) {
            return;
        }
        const { id, title, type, username, photoUrl } = initData.chat;

        return [
            { title: 'id', value: id.toString() },
            { title: 'title', value: title },
            { title: 'type', value: type },
            { title: 'username', value: username },
            { title: 'photo_url', value: photoUrl },
        ];
    }, [initData]);

    const initDataRaw = useLaunchParams().initDataRaw;
    
    const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
        if (!initData || !initDataRaw) {
        return;
        }
        const {
        hash,
        queryId,
        chatType,
        chatInstance,
        authDate,
        startParam,
        canSendAfter,
        canSendAfterDate,
        } = initData;
        return [
        { title: 'raw', value: initDataRaw },
        { title: 'auth_date', value: authDate.toLocaleString() },
        { title: 'auth_date (raw)', value: authDate.getTime() / 1000 },
        { title: 'hash', value: hash },
        { title: 'can_send_after', value: canSendAfterDate?.toISOString() },
        { title: 'can_send_after (raw)', value: canSendAfter },
        { title: 'query_id', value: queryId },
        { title: 'start_param', value: startParam },
        { title: 'chat_type', value: chatType },
        { title: 'chat_instance', value: chatInstance },
        ];
    }, [initData, initDataRaw]);

    return (
        <>
            <Modal
                header={<Modal.Header>Покупка</Modal.Header>}
                trigger={
                  <Button mode='bezeled' size='s'>Добавить пользователя 🛒</Button>
                }
            >
                <Placeholder
                    description={
                        <>
                        <Input status='focused' header='Имя'></Input>
                        <Input status='focused' header='Фамилия'></Input>
                        <Input status='focused' header='ID'></Input>
                        <Button mode='bezeled' size='m' className={style.button__buy}>Добавить</Button>
                        </>
                    }
                >
                </Placeholder>
            </Modal>
            <List>
                <DisplayData header={'Init Data'} rows={initDataRows || []}/>
                {userRows && <DisplayData header={'User'} rows={userRows} />}
                {receiverRows && (
                    <DisplayData header={'Receiver'} rows={receiverRows} />
                )}
                {chatRows && <DisplayData header={'Chat'} rows={chatRows} />}
            </List>
        </>
    );
};
