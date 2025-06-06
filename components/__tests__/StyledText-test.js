import renderer from "react-test-renderer";

import { GroteskText } from "../StyledText";

it(`renders correctly`, () => {
    const tree = renderer
        .create(<GroteskText>Snapshot test!</GroteskText>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
