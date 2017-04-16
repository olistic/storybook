import React from 'react';
import { shallow } from 'enzyme';
import LeftPanel from '../index';
import Header from '../header';
import TextFilter from '../text_filter';
import Stories from '../stories';

describe('manager.ui.components.left_panel.index', () => {
  test('should render Header and TextFilter by default', () => {
    const openShortcutsHelp = jest.fn();
    const storyFilter = 'xxxxx';
    const wrap = shallow(
      <LeftPanel openShortcutsHelp={openShortcutsHelp} storyFilter={storyFilter} />,
    );

    const header = wrap.find(Header).first();
    expect(header).toHaveProp('openShortcutsHelp', openShortcutsHelp);

    const textFilter = wrap.find(TextFilter).first();
    expect(textFilter).toHaveProp('text', storyFilter);

    expect(wrap.find(Stories)).toBeEmpty();
  });

  test('should render stories only if stories prop exists', () => {
    const selectedKind = 'kk';
    const selectedStory = 'bb';
    const stories = [{ kind: 'kk', stories: ['bb'] }];
    const wrap = shallow(
      <LeftPanel stories={stories} selectedKind={selectedKind} selectedStory={selectedStory} />,
    );

    const header = wrap.find(Stories).first();
    expect(header.props()).toEqual({
      stories,
      selectedKind,
      selectedStory,
    });
  });

  describe('onStoryFilter prop', () => {
    test('should set filter as an empty text on TextFilter.onClear', () => {
      const onStoryFilter = jest.fn();
      const wrap = shallow(<LeftPanel onStoryFilter={onStoryFilter} />);

      const textFilter = wrap.find(TextFilter).first();
      textFilter.props().onClear();

      expect(onStoryFilter).toHaveBeenCalledWith('');
    });

    test('should set filter as the given text of TextFilter.onChange', () => {
      const onStoryFilter = jest.fn();
      const filterText = 'XXX';
      const wrap = shallow(<LeftPanel onStoryFilter={onStoryFilter} />);

      const textFilter = wrap.find(TextFilter).first();
      textFilter.props().onChange(filterText);

      expect(onStoryFilter).toHaveBeenCalledWith(filterText);
    });
  });
});
