function ProfilePanes({ active, panes = [] }) {
    const pane = panes.find((item) => item.name === active);
    if (pane) {
        return pane.render();
    }
    return <></>
}

export default ProfilePanes;
