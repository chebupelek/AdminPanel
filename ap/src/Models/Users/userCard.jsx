import { Card, Typography, Checkbox, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeRoleThunkCreator } from "../../Reducers/UsersListReducer";

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

function UserCard({ id, name, mail, accountTag, accountCreateDate, systemRoles, checked, onCheck }) {
    const dispatch = useDispatch();

    const handleRemoveRole = (roleId) => {
        const payload = {
            roleId: roleId,
            userId: id
        };

        dispatch(removeRoleThunkCreator(payload));
    };

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb', marginTop: '1%' }}>
            <Checkbox checked={checked} onChange={(e) => onCheck(id, e.target.checked)}>
                <Typography.Title level={4} style={{ margin: 0 }}>{name}</Typography.Title>
            </Checkbox>

            <div>Почта - <strong>{mail}</strong></div>
            <div>Тэг - <strong>{accountTag}</strong></div>
            <div>Дата создания аккаунта - <strong>{formatDate(accountCreateDate)}</strong></div>

            <div style={{ marginTop: "10px", marginBottom: "6px" }}>Роли:</div>

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px"
            }}>
                {systemRoles.map(role => (
                    <Tag
                        key={role.id}
                        color="blue"
                        style={{ padding: "5px 10px", fontSize: "14px" }}
                        closable
                        onClose={(e) => {
                            e.preventDefault();
                            handleRemoveRole(role.id);
                        }}
                        closeIcon={<CloseOutlined style={{ fontSize: "12px", color: "red" }} />}
                    >
                        {role.name}
                    </Tag>
                ))}
            </div>
        </Card>
    );
}


export default UserCard;
