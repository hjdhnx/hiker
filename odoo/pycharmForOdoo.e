CNWTEPRGs��
s ��Ϫ��ͻ��s s s s s            <                                                                                                s!\�Gs �ú���λ��s s s s s         '��Z�                                              pycharmForOdoo7   �������pycharm��дodoo�����ģ��
@��ע:
qq 434857005   qq 434857005                                                                           s���s �����Э��s s s s s          ����q�                                              R Sr�
��   ����1       �   �&�&�&���������    �   .  }  �  \  Q  �  s  7  �  k  
  �                           �F2   2   �  B                                                                     �                                                                         pycharmForOdoo By hjdhnx    C                         ����              ����                     K                         ���¼�¼             ���¼�¼                     C                         ����             ����                     �                         ͸����ǩ2      (   (   (                                                                                      ǩ���                         �༭��3  �*F8   0   �                                                                       ���                        *             d               1   DaShenHan&����-----�ȿ������ƾ���������------        �                         ��ť4  �+F�     8   (                                                                                  �򿪎                         ��ť3  `,FP  X   P                                                                                      ����־�                         �༭��2  -F   x   �  �                                                                    ���                      *             d                           �                         ͸����ǩ1  �       0                                                                                         ����Ŀ¼�                         ��ť2  0.F�   X   x                                                                                      д����ģ��                         ��ť1   F   X   �                                                                                      ��ȡpycharm����Ŀ¼n                         �༭��1  �.F@      `  (                                                          S   X�  �(�(�(�(�(������������������������������������������������������������������������������    Y  6g  ��  �  ت  ��  #�  f�  	�  Q�  ��  ��  ��  5�  u�  ��  �  �  Y�  ��  ��  ��  �  #�  W�  ��  װ  %�  w�  ��  ��  ӱ  �  �  -�  I�  k�  ��  ��  ̲  �  �  :�  Z�  }�  ��  ų  �  �  9�  a�  ��  ��  ٴ  ��  �  7�  W�  x�  ��  ��  ��  ٵ  ��  #�  F�  g�  ��  �  7�  ��  ط  �  �  B�  g�  ��  �  0�  ��  ڹ  c�  Y    odoo_xml   Y  <templateSet group="odoo">
  <template name="otree" value="&lt;record model=&quot;ir.ui.view&quot; id=&quot;$model_name$_tree&quot;&gt;&#10;              &lt;field name=&quot;name&quot;&gt;$model_name$_tree&lt;/field&gt;&#10;              &lt;field name=&quot;model&quot;&gt;$model$&lt;/field&gt;&#10;              &lt;field name=&quot;arch&quot; type=&quot;xml&quot;&gt;&#10;                &lt;tree limit='1000'&gt;&#10;                    &lt;field name=&quot;name&quot; string=&quot;名称&quot;/&gt;&#10;                    &lt;field name=&quot;type_id&quot; string=&quot;类型&quot; widget=&quot;many2one&quot;/&gt;&#10;                    &lt;field name=&quot;author&quot; string=&quot;作者&quot;/&gt;&#10;                    &lt;field name=&quot;home_url&quot; string=&quot;主页链接&quot;/&gt;&#10;                    &lt;field name=&quot;active&quot; string=&quot;启用&quot; widget=&quot;toggle_button&quot;/&gt;&#10;                &lt;/tree&gt;&#10;              &lt;/field&gt;&#10;&lt;/record&gt;" description="odoo列表" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="oform" value="&lt;record model=&quot;ir.ui.view&quot; id=&quot;$model_name$_form&quot;&gt;&#10;              &lt;field name=&quot;name&quot;&gt;$model_name$_form&lt;/field&gt;&#10;              &lt;field name=&quot;model&quot;&gt;$model$&lt;/field&gt;&#10;                &lt;field name=&quot;priority&quot;&gt;10&lt;/field&gt;&#10;              &lt;field name=&quot;arch&quot; type=&quot;xml&quot;&gt;&#10;                &lt;form create=&quot;1&quot; edit=&quot;1&quot; delete=&quot;1&quot;&gt;&#10;                  &lt;sheet&gt;&#10;                      &lt;field name=&quot;pic_url_img&quot; class=&quot;oe_avatar&quot;/&gt;&#10;                        &lt;div class=&quot;oe_title&quot;&gt;&#10;                            &lt;label for=&quot;name&quot; class=&quot;oe_edit_only&quot; string=&quot;名称&quot;/&gt;&#10;                            &lt;h1&gt;&lt;field name=&quot;name&quot; required=&quot;1&quot; placeholder=&quot;名称&quot;/&gt;&lt;/h1&gt;&#10;                        &lt;/div&gt;&#10;                      &lt;group col=&quot;3&quot; &gt;&#10;                          &lt;group colspan=&quot;1&quot;&gt;&#10;                              &lt;field name=&quot;type_id&quot; string=&quot;规则分类&quot;/&gt;&#10;                          &lt;/group&gt;&#10;                          &lt;group colspan=&quot;1&quot;&gt;&#10;                              &lt;field name=&quot;dev_id&quot; string=&quot;开发者&quot;/&gt;&#10;                              &lt;field name=&quot;auth&quot; attrs=&quot;{'invisible':[('state','!=','private')]}&quot;/&gt;&#10;                          &lt;/group&gt;&#10;                      &lt;/group&gt;&#10;                      &lt;group&gt;&#10;                          &lt;group&gt;&#10;                                &lt;field name=&quot;home_url&quot; string=&quot;主页链接&quot;/&gt;&#10;                                &lt;field name=&quot;pic_url&quot; string=&quot;图片链接&quot;/&gt;&#10;                          &lt;/group&gt;&#10;&#10;                          &lt;group&gt;&#10;                              &lt;field name=&quot;is_json_list&quot; string=&quot;是否合集&quot; attrs=&quot;{'invisible':[('is_json','=',False)]}&quot;/&gt;&#10;                              &lt;field name=&quot;author&quot; string=&quot;作者&quot;/&gt;&#10;                          &lt;/group&gt;&#10;                      &lt;/group&gt;&#10;                  &lt;/sheet&gt;&#10;                &lt;/form&gt;&#10;              &lt;/field&gt;&#10;        &lt;/record&gt;" description="odoo表单" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="oheader" value="&lt;header&gt;&#10;    &lt;button name=&quot;share&quot; string=&quot;分享此规则&quot; type=&quot;object&quot; class=&quot;oe_highlight&quot;/&gt;&#10;    &lt;field name=&quot;state&quot; widget=&quot;statusbar&quot;/&gt;&#10;&lt;/header&gt;" description="odoo表头,放在form下面sheet上面" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="ofooter" value="&lt;footer&gt;&#10;    &lt;button string='拒绝' name=&quot;expense_payment_refuse_reason&quot; type=&quot;object&quot; class=&quot;oe_highlight&quot;/&gt;&#10;    &lt;button string=&quot;取消&quot; class=&quot;oe_link&quot; special=&quot;cancel&quot;/&gt;&#10;&lt;/footer&gt;" description="odoo页脚,放在&lt;/sheet&gt;下面,&lt;/form&gt;上面" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="omail" value="&lt;div class=&quot;oe_chatter&quot;&gt;&#10;    &lt;field name=&quot;message_follower_ids&quot; widget=&quot;mail_followers&quot;/&gt;&#10;    &lt;field name=&quot;activity_ids&quot; widget=&quot;mail_activity&quot;/&gt;&#10;    &lt;field name=&quot;message_ids&quot; widget=&quot;mail_thread&quot;/&gt;&#10;&lt;/div&gt;" description="odoo信息,放在&lt;/sheet&gt;外面&lt;/form&gt;上面" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="onotebook" value="&lt;notebook&gt;&#10;&lt;page string=&quot;系统信息&quot; groups=&quot;base.group_no_one&quot;&gt;&#10;  &lt;group&gt;&#10;      &lt;group&gt;&#10;            &lt;field name=&quot;create_date&quot; readonly=&quot;1&quot; string=&quot;创建人&quot;/&gt;&#10;            &lt;field name=&quot;create_uid&quot; readonly=&quot;1&quot; string=&quot;创建日期&quot;/&gt;&#10;      &lt;/group&gt;&#10;&#10;      &lt;group&gt;&#10;            &lt;field name=&quot;write_date&quot; readonly=&quot;1&quot; string=&quot;修改人&quot;/&gt;&#10;            &lt;field name=&quot;write_uid&quot; readonly=&quot;1&quot; string=&quot;修改日期&quot;/&gt;&#10;      &lt;/group&gt;&#10;&#10;  &lt;/group&gt;&#10;&lt;/page&gt;&#10;&lt;/notebook&gt;" description="odoo页签,放在sheet内部" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="obtnbox" value="&lt;div class=&quot;oe_button_box&quot; name=&quot;button_box&quot;&gt;&#10;        &lt;button name=&quot;toggle_active&quot; type=&quot;object&quot; class=&quot;oe_stat_button&quot; icon=&quot;fa-archive&quot;&gt;&#10;            &lt;field name=&quot;active&quot; widget=&quot;boolean_button&quot;/&gt;&#10;        &lt;/button&gt;&#10;&lt;/div&gt;" description="odoo按钮盒,放在&lt;sheet&gt;内部开头" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="okanban" value="&lt;record id=&quot;$model_name$_kanban&quot; model=&quot;ir.ui.view&quot;&gt;&#10;        &lt;field name=&quot;name&quot;&gt;$model_name$_kanban&lt;/field&gt;&#10;        &lt;field name=&quot;model&quot;&gt;$model$&lt;/field&gt;&#10;        &lt;field name=&quot;priority&quot;&gt;10&lt;/field&gt;&#10;        &lt;field name=&quot;arch&quot; type=&quot;xml&quot;&gt;&#10;            &lt;kanban class=&quot;o_kanban_mobile&quot;&gt;&#10;                &lt;templates&gt;&#10;                    &lt;t t-name=&quot;kanban-box&quot;&gt;&#10;                        &lt;div t-attf-class=&quot;oe_kanban_content oe_kanban_global_click&quot;&gt;&#10;&#10;                         &lt;div class=&quot;row mb4&quot;&gt;&#10;                            &lt;div class=&quot;col-6&quot;&gt;&#10;                                &lt;strong&gt;&lt;span&gt;&lt;field name=&quot;name&quot;/&gt;&lt;/span&gt;&lt;/strong&gt;&#10;                            &lt;/div&gt;&#10;                        &lt;/div&gt;&#10;&#10;                            &lt;div class=&quot;col-12 text-right&quot;&gt;&#10;                                        &lt;field name=&quot;active&quot; widget=&quot;toggle_button&quot;/&gt;&#10;                            &lt;/div&gt;&#10;                            &lt;div class=&quot;oe_module_action&quot; t-if=&quot;!selection_mode&quot;&gt;&#10;                                &lt;button class=&quot;btn-primary&quot; name=&quot;apply_this_app&quot; string=&quot;仅用此机器人&quot; type=&quot;object&quot;&gt;仅用此机器人&lt;/button&gt;&#10;                            &lt;/div&gt;&#10;                        &lt;/div&gt;&#10;                    &lt;/t&gt;&#10;                &lt;/templates&gt;&#10;            &lt;/kanban&gt;&#10;        &lt;/field&gt;&#10;&lt;/record&gt;" description="odoo看板" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="osearch" value="&lt;record model=&quot;ir.ui.view&quot; id=&quot;$model_name$_search&quot;&gt;&#10;                &lt;field name=&quot;name&quot;&gt;$model_name$_search&lt;/field&gt;&#10;                &lt;field name=&quot;model&quot;&gt;$model$&lt;/field&gt;&#10;                &lt;field name=&quot;arch&quot; type=&quot;xml&quot;&gt;&#10;                  &lt;search string=&quot;搜索&quot;&gt;&#10;                      &lt;!--自定义可搜索字段，比如价格--&gt;&#10;                    &lt;field name=&quot;name&quot; string=&quot;名称&quot;/&gt;&#10;                    &lt;separator/&gt;&#10;                    &lt;filter string=&quot;全部&quot; name=&quot;all&quot; domain=&quot;['|',('active','=',True),('active','=',False)]&quot;/&gt;&#10;                    &lt;filter string=&quot;已启用&quot; name=&quot;active&quot; domain=&quot;[('active','=',True)]&quot;/&gt;&#10;                    &lt;filter string=&quot;已归档&quot; name=&quot;drop&quot; domain=&quot;[('active','=',False)]&quot;/&gt;&#10;                    &lt;separator/&gt;&#10;                    &lt;group expand=&quot;0&quot; string=&quot;分组&quot;&gt;&#10;                        &lt;filter string=&quot;状态&quot; name=&quot;state&quot; context=&quot;{'group_by':'state'}&quot;/&gt;&#10;                    &lt;/group&gt;&#10;                  &lt;/search&gt;&#10;&#10;               &lt;/field&gt;&#10;&lt;/record&gt;" description="odoo搜索" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="otreeInherit" value="&lt;record model = &quot;ir.ui.view&quot; id = &quot;$model_name$_tree_extent&quot;&gt;&#10;            &lt;field name=&quot;name&quot;&gt;$model_name$_tree_extent&lt;/field&gt;&#10;            &lt;field name=&quot;model&quot;&gt;$model$&lt;/field&gt;&#10;            &lt;field name=&quot;inherit_id&quot; ref=&quot;$module$.$tree_view$&quot;/&gt;&#10;            &lt;field name=&quot;arch&quot; type=&quot;xml&quot;&gt;&#10;            &lt;data&gt;&#10;                &lt;xpath expr = &quot;//field[@name='name']&quot; position = &quot;after&quot;&gt;&#10;                    &lt;field name=&quot;note&quot; string=&quot;备注&quot;/&gt;&#10;                &lt;/xpath&gt;&#10;                &#10;                &lt;xpath expr = &quot;//field[@name='name']&quot; position = &quot;before&quot;&gt;&#10;                    &lt;field name=&quot;note&quot; string=&quot;备注&quot;/&gt;&#10;                &lt;/xpath&gt;&#10;                &#10;                &lt;xpath expr = &quot;//field[@name='name']&quot; position = &quot;attributes&quot;&gt;&#10;                    &lt;attribute name=&quot;invisible&quot;&gt;1&lt;/attribute&gt;&#10;                    &lt;attribute name=&quot;string&quot;&gt;名称&lt;/attribute&gt;&#10;                &lt;/xpath&gt;&#10;                &#10;            &lt;/data&gt;&#10;            &lt;/field&gt;&#10;&lt;/record&gt;" description="odoo列表继承" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="module" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="tree_view" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="oformInherit" value="&lt;record model = &quot;ir.ui.view&quot; id = &quot;$model_name$_form_extent&quot;&gt;&#10;            &lt;field name=&quot;name&quot;&gt;$model_name$_form_extent&lt;/field&gt;&#10;            &lt;field name=&quot;model&quot;&gt;$model$&lt;/field&gt;&#10;            &lt;field name=&quot;inherit_id&quot; ref=&quot;$module$.$form_view$&quot;/&gt;&#10;            &lt;field name=&quot;arch&quot; type=&quot;xml&quot;&gt;&#10;            &lt;data&gt;&#10;                &lt;xpath expr = &quot;//field[@name='name']&quot; position = &quot;after&quot;&gt;&#10;                    &lt;field name=&quot;note&quot; string=&quot;备注&quot;/&gt;&#10;                &lt;/xpath&gt;&#10;                &#10;                &lt;xpath expr = &quot;//field[@name='name']&quot; position = &quot;before&quot;&gt;&#10;                    &lt;field name=&quot;note&quot; string=&quot;备注&quot;/&gt;&#10;                &lt;/xpath&gt;&#10;                &#10;                &lt;xpath expr = &quot;//field[@name='name']&quot; position = &quot;attributes&quot;&gt;&#10;                    &lt;attribute name=&quot;invisible&quot;&gt;1&lt;/attribute&gt;&#10;                    &lt;attribute name=&quot;string&quot;&gt;名称&lt;/attribute&gt;&#10;                &lt;/xpath&gt;&#10;                &#10;            &lt;/data&gt;&#10;            &lt;/field&gt;&#10;&lt;/record&gt;" description="odoo表单继承" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="module" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="form_view" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="osearchInherit" value="&lt;record model = &quot;ir.ui.view&quot; id = &quot;$model_name$_search_ext&quot;&gt;&#10;            &lt;field name=&quot;name&quot;&gt;$model_name$_search_ext&lt;/field&gt;&#10;            &lt;field name=&quot;model&quot;&gt;$model$&lt;/field&gt;&#10;            &lt;field name=&quot;inherit_id&quot; ref=&quot;$module$.$search_view$&quot;/&gt;&#10;           &lt;field name=&quot;priority&quot; eval=&quot;10&quot;/&gt;&#10;            &lt;field name=&quot;arch&quot; type=&quot;xml&quot;&gt;&#10;&#10;                &lt;xpath expr = &quot;//group/filter[@name='state']&quot; position = &quot;after&quot;&gt;&#10;                    &lt;filter string=&quot;组&quot; name=&quot;group_id&quot; context=&quot;{'group_by':'group_id'}&quot; domain=&quot;[]&quot;/&gt;&#10;                &lt;/xpath&gt;&#10;            &lt;/field&gt;&#10;&lt;/record&gt;" description="odoo搜索继承" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="module" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="search_view" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="oactionWin" value=" &lt;record id=&quot;action_open_$model_name$&quot; model=&quot;ir.actions.act_window&quot;&gt;&#10;            &lt;field name=&quot;name&quot;&gt;$model_name$列表&lt;/field&gt;&#10;            &lt;field name=&quot;res_model&quot;&gt;$model$&lt;/field&gt;&#10;            &lt;field name=&quot;view_mode&quot;&gt;tree,form&lt;/field&gt;&#10;            &lt;field name=&quot;view_id&quot; ref=&quot;$module$.$tree_view$&quot;/&gt;&#10;&lt;!--            &lt;field name=&quot;target&quot;&gt;new,current,main,fullscreen&lt;/field&gt;--&gt;&#10;            &lt;field name=&quot;context&quot;&gt;{'search_default_all':True,'form_view_ref': '$module$.form_view', 'tree_view_ref': '$module$.tree_view'}&lt;/field&gt;&#10;            &lt;field name=&quot;domain&quot;&gt;[('create_uid','=',uid)]&lt;/field&gt;&#10;&lt;/record&gt;" description="odoo窗口动作" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="module" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="tree_view" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="oactionSev" value="&lt;record id=&quot;action_$action_name$&quot; model=&quot;ir.actions.server&quot;&gt;&#10;                    &lt;field name=&quot;name&quot;&gt;$action_name$&lt;/field&gt;&#10;                    &lt;field name=&quot;model_id&quot; ref=&quot;model_$model_name$&quot;/&gt;&#10;                    &lt;field name=&quot;binding_model_id&quot; ref=&quot;model_$model_name$&quot;/&gt;  &lt;!--将该动作添加到该模型视图的选项中--&gt;&#10;                    &lt;field name=&quot;state&quot;&gt;code&lt;/field&gt;&#10;                    &lt;field name=&quot;code&quot;&gt;&#10;                    action = records.action_$action_name$()&#10;                    &lt;/field&gt;&#10;&lt;/record&gt;" description="odoo服务器动作" toReformat="true" toShortenFQNames="true">
    <variable name="action_name" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="omenu" value="&lt;menuitem name=&quot;子菜单名称&quot; id=&quot;menu_$menu_id$&quot; parent=&quot;$module$.$parent_menu_id$&quot;&#10;                  action=&quot;$module$.$act_win$&quot; sequence=&quot;1&quot;/&gt;" description="odoo子菜单" toReformat="true" toShortenFQNames="true">
    <variable name="menu_id" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="module" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="parent_menu_id" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="act_win" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="omenu_root" value="&lt;menuitem name=&quot;根菜单名称&quot; groups=&quot;base.group_system&quot; &#10;          id=&quot;nemu_$model_name$_root&quot;&#10;          web_icon=&quot;$module$,static/description/icon.png&quot;  &#10;          action=&quot;$module$.$act_win$&quot; sequence=&quot;1&quot;/&gt;" description="odoo顶级菜单" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="module" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="act_win" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="oactionUrl" value="&lt;record model=&quot;ir.actions.act_url&quot; id=&quot;actUrl_open_baidu&quot;&gt;&#10;      &lt;field name=&quot;name&quot;&gt;打开百度&lt;/field&gt;&#10;      &lt;field name=&quot;target&quot;&gt;new,self&lt;/field&gt;&#10;      &lt;field name=&quot;url&quot;&gt;https://www.baidu.com&lt;/field&gt;&#10;&lt;/record&gt;" description="odoo打开链接动作" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
  <template name="opivot" value="&lt;record id=&quot;$model_name$_pivot&quot; model=&quot;ir.ui.view&quot;&gt;&#10;        &lt;field name=&quot;name&quot;&gt;$model_name$_pivot&lt;/field&gt;&#10;        &lt;field name=&quot;model&quot;&gt;$model$&lt;/field&gt;&#10;        &lt;field name=&quot;priority&quot;&gt;10&lt;/field&gt;&#10;        &lt;field name=&quot;arch&quot; type=&quot;xml&quot;&gt;&#10;            &lt;pivot string=&quot;$model_name$_pivot&quot; &gt;&#10;                    &lt;field name=&quot;internal_group&quot; type=&quot;row&quot;/&gt;&#10;                    &lt;field name=&quot;account_id&quot; type=&quot;row&quot;/&gt;&#10;                    &lt;field name=&quot;fr_period_id&quot; type=&quot;col&quot; string=&quot;会计期间&quot;/&gt;&#10;                    &lt;field name=&quot;debit_start&quot; type=&quot;measure&quot;/&gt;&#10;                    &lt;field name=&quot;credit_start&quot; type=&quot;measure&quot;/&gt;&#10;                    &lt;field name=&quot;beginning_start&quot; type=&quot;measure&quot;/&gt;&#10;            &lt;/pivot&gt;&#10;        &lt;/field&gt;&#10;&lt;/record&gt;" description="odoo透视图" toReformat="false" toShortenFQNames="true">
    <variable name="model_name" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="XML_TEXT" value="true" />
    </context>
  </template>
</templateSet>    opython_xml    <templateSet group="opython">
  <template name="opaction" value="val =  {&#10;            'name': &quot;$action_name$&quot;,&#10;            'view_mode': 'tree,form',&#10;            'res_model': '$module$.$menu_name$',&#10;            'domain': [('id', '=', self.receivable_id.id)],&#10;            'type': 'ir.actions.act_window',&#10;            'context': {'form_view_ref': '$module$.form_view','tree_view_ref': '$module$.tree_view',&#10;                        },&#10;            'target': 'self',&#10;    }" description="odoo动作" toReformat="true" toShortenFQNames="true">
    <variable name="action_name" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="module" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="menu_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="Python" value="true" />
    </context>
  </template>
  <template name="opmail" value="_inherit = ['mail.thread', 'mail.activity.mixin']" description="odoo继承消息" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="Python" value="true" />
    </context>
  </template>
  <template name="opmodel" value="class $model_name$(models.Model):&#10;    _name = '$model$'&#10;    _inherit = ['mail.thread', 'mail.activity.mixin']&#10;    _description = '描述'&#10;    _rec_name = &quot;name&quot;&#10;    _order = 'code, name asc'" description="odoo模型" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="Python" value="true" />
    </context>
  </template>
  <template name="opimport" value="from odoo import models, fields, api&#10;from odoo.exceptions import UserError, ValidationError" description="odoo引入包" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="Python" value="true" />
    </context>
  </template>
  <template name="opactive" value="active = fields.Boolean(string='是否启用',default=True)" description="odoo启用字段" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="Python" value="true" />
    </context>
  </template>
  <template name="opinstall" value="'installable': True,&#10;'application': True,&#10;'sequence': '1',&#10;'auto_install': False" description="odoo模块安装信息" toReformat="true" toShortenFQNames="true">
    <context>
      <option name="Python" value="true" />
    </context>
  </template>
  <template name="opoption" value="department_type_option = [(1,&quot;临床&quot;),(2,&quot;医技&quot;),(3,&quot;医辅&quot;),(4,&quot;行政后勤&quot;)]&#10;department_type = fields.Selection(department_type_option,string=&quot;科室类别&quot;)" description="odoo选项字段" toReformat="false" toShortenFQNames="true">
    <context>
      <option name="Python" value="true" />
    </context>
  </template>
  <template name="opmodel_wizard" value="class $model_name$_wizard(models.Model):&#10;    _name = '$model$.wizard'&#10;    _description = '向导'" description="odoo瞬态模型" toReformat="true" toShortenFQNames="true">
    <variable name="model_name" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="model" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="Python" value="true" />
    </context>
  </template>
</templateSet>zB    �����ֲ�_md  gB  ### pycharm 2021.1.3 已装中文插件
###### 设置py文件默认前缀

文件->设置->编辑器->文件和代码模板  
选择文件下的Python script,在里面写入以下代码:
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : ${NAME}.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : ${DATE}
```
然后下面的两个勾都勾上，按照代码重新格式化与启用实时模板  
#####  新建文件增加odoo视图
也是在刚才的位置，文件里创建一个,名称为odoo视图，扩展为xml  
代码里如下:
```xml
<odoo>
    <data>
        
        
        
    </data>
</odoo>
```

#### odoo实时模板  
文件->设置->编辑器->实时模板  
点击右边+号，选择模板组，输入odoo,然后确定  
接着在odoo模板组里，建立一个个的模板。参考如下:  
缩写: otree  
名称: odoo列表  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model="ir.ui.view" id="$model_name$_tree">
              <field name="name">$model_name$_tree</field>
              <field name="model">$model$</field>
                <field name="priority">10</field>
              <field name="arch" type="xml">
                <tree limit='1000'>
                    <field name="name" string="名称"/>
                    <field name="type_id" string="类型" widget="many2one"/>
                    <field name="author" string="作者"/>
                    <field name="home_url" string="主页链接"/>
                    <field name="active" string="启用" widget="toggle_button"/>
                </tree>
              </field>
</record>
```
并且进配置将俩变量都设置为表达式
```
fileNameWithoutExtension()
```

缩写: oform  
名称: odoo表单  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model="ir.ui.view" id="$model_name$_form">
              <field name="name">$model_name$_form</field>
              <field name="model">$model$</field>
                <field name="priority">10</field>
              <field name="arch" type="xml">
                <form create="1" edit="1" delete="1">
                  <sheet>
                      <field name="pic_url_img" class="oe_avatar"/>
                        <div class="oe_title">
                            <label for="name" class="oe_edit_only" string="名称"/>
                            <h1><field name="name" required="1" placeholder="名称"/></h1>
                        </div>
                      <group col="3" >
                          <group colspan="1">
                              <field name="type_id" string="规则分类"/>
                          </group>
                          <group colspan="1">
                              <field name="dev_id" string="开发者"/>
                              <field name="auth" attrs="{'invisible':[('state','!=','private')]}"/>
                          </group>
                      </group>
                      <group>
                          <group>
                                <field name="home_url" string="主页链接"/>
                                <field name="pic_url" string="图片链接"/>
                          </group>

                          <group>
                              <field name="is_json_list" string="是否合集" attrs="{'invisible':[('is_json','=',False)]}"/>
                              <field name="author" string="作者"/>
                          </group>
                      </group>
                  </sheet>
                </form>
              </field>
        </record>
```

缩写: oheader  
名称: odoo表头,放在form下面sheet上面  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<header>
    <button name="share" string="分享此规则" type="object" class="oe_highlight"/>
    <field name="state" widget="statusbar"/>
</header>
```

缩写: ofooter  
名称: odoo页脚,放在</sheet>下面,</form>上面 
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<footer>
    <button string='拒绝' name="expense_payment_refuse_reason" type="object" class="oe_highlight"/>
    <button string="取消" class="oe_link" special="cancel"/>
</footer>
```


缩写: omail  
名称: odoo信息,放在</sheet>外面</form>上面  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<div class="oe_chatter">
    <field name="message_follower_ids" widget="mail_followers"/>
    <field name="activity_ids" widget="mail_activity"/>
    <field name="message_ids" widget="mail_thread"/>
</div>
```

缩写: onotebook 
名称: odoo页签,放在sheet内部 
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<notebook>
<page string="系统信息" groups="base.group_no_one">
  <group>
      <group>
            <field name="create_date" readonly="1" string="创建人"/>
            <field name="create_uid" readonly="1" string="创建日期"/>
      </group>

      <group>
            <field name="write_date" readonly="1" string="修改人"/>
            <field name="write_uid" readonly="1" string="修改日期"/>
      </group>

  </group>
</page>
</notebook>
```

缩写: obtnbox  
名称: odoo按钮盒,放在<sheet>内部开头  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<div class="oe_button_box" name="button_box">
        <button name="toggle_active" type="object" class="oe_stat_button" icon="fa-archive">
            <field name="active" widget="boolean_button"/>
        </button>
</div>
```


缩写: okanban  
名称: odoo看板   
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record id="$model_name$_kanban" model="ir.ui.view">
        <field name="name">$model_name$_kanban</field>
        <field name="model">$model$</field>
        <field name="priority">10</field>
        <field name="arch" type="xml">
            <kanban class="o_kanban_mobile">
                <templates>
                    <t t-name="kanban-box">
                        <div t-attf-class="oe_kanban_content oe_kanban_global_click">

                         <div class="row mb4">
                            <div class="col-6">
                                <strong><span><field name="name"/></span></strong>
                            </div>
                        </div>

                            <div class="col-12 text-right">
                                        <field name="active" widget="toggle_button"/>
                            </div>
                            <div class="oe_module_action" t-if="!selection_mode">
                                <button class="btn-primary" name="apply_this_app" string="仅用此机器人" type="object">仅用此机器人</button>
                            </div>
                        </div>
                    </t>
                </templates>
            </kanban>
        </field>
</record>
```

缩写: opivot  
名称: odoo透视图   
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record id="$model_name$_pivot" model="ir.ui.view">
        <field name="name">$model_name$_pivot</field>
        <field name="model">$model$</field>
        <field name="priority">10</field>
        <field name="arch" type="xml">
            <pivot string="$model_name$_pivot" >
                    <field name="internal_group" type="row"/>
                    <field name="account_id" type="row"/>
                    <field name="fr_period_id" type="col" string="会计期间"/>
                    <field name="debit_start" type="measure"/>
                    <field name="credit_start" type="measure"/>
                    <field name="beginning_start" type="measure"/>
            </pivot>
        </field>
</record>
```

缩写: osearch  
名称: odoo搜索   
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model="ir.ui.view" id="$model_name$_search">
                <field name="name">$model_name$_search</field>
                <field name="model">$model$</field>
                <field name="arch" type="xml">
                  <search string="搜索">
                      <!--自定义可搜索字段，比如价格-->
                    <field name="name" string="名称"/>
                    <separator/>
                    <filter string="全部" name="all" domain="['|',('active','=',True),('active','=',False)]"/>
                    <filter string="已启用" name="active" domain="[('active','=',True)]"/>
                    <filter string="已归档" name="drop" domain="[('active','=',False)]"/>
                    <separator/>
                    <group expand="0" string="分组">
                        <filter string="状态" name="state" context="{'group_by':'state'}"/>
                    </group>
                  </search>

               </field>
</record>
```

缩写: otreeInherit  
名称: odoo列表继承  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model = "ir.ui.view" id = "$model_name$_tree_extent">
            <field name="name">$model_name$_tree_extent</field>
            <field name="model">$model$</field>
            <field name="inherit_id" ref="$module$.$tree_view$"/>
            <field name="arch" type="xml">
            <data>
                <xpath expr = "//field[@name='name']" position = "after">
                    <field name="note" string="备注"/>
                </xpath>
                
                <xpath expr = "//field[@name='name']" position = "before">
                    <field name="note" string="备注"/>
                </xpath>
                
                <xpath expr = "//field[@name='name']" position = "attributes">
                    <attribute name="invisible">1</attribute>
                    <attribute name="string">名称</attribute>
                </xpath>
                
            </data>
            </field>
</record>
```

缩写: oformInherit  
名称: odoo表单继承  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model = "ir.ui.view" id = "$model_name$_form_extent">
            <field name="name">$model_name$_form_extent</field>
            <field name="model">$model$</field>
            <field name="inherit_id" ref="$module$.$form_view$"/>
            <field name="arch" type="xml">
            <data>
                <xpath expr = "//field[@name='name']" position = "after">
                    <field name="note" string="备注"/>
                </xpath>
                
                <xpath expr = "//field[@name='name']" position = "before">
                    <field name="note" string="备注"/>
                </xpath>
                
                <xpath expr = "//field[@name='name']" position = "attributes">
                    <attribute name="invisible">1</attribute>
                    <attribute name="string">名称</attribute>
                </xpath>
                
            </data>
            </field>
</record>
```

缩写: osearchInherit  
名称: odoo搜索继承  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model = "ir.ui.view" id = "$model_name$_search_ext">
            <field name="name">$model_name$_search_ext</field>
            <field name="model">$model$</field>
            <field name="inherit_id" ref="$module$.$search_view$"/>
           <field name="priority" eval="10"/>
            <field name="arch" type="xml">

                <xpath expr = "//group/filter[@name='state']" position = "after">
                    <filter string="组" name="group_id" context="{'group_by':'group_id'}" domain="[]"/>
                </xpath>
            </field>
</record>
```

缩写: oactionWin  
名称: odoo窗口动作  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
 <record id="action_open_$model_name$" model="ir.actions.act_window">
            <field name="name">$model_name$列表</field>
            <field name="res_model">$model$</field>
            <field name="view_mode">tree,form</field>
            <field name="view_id" ref="$module$.$tree_view$"/>
<!--            <field name="target">new,current,main,fullscreen</field>-->
            <field name="context">{'search_default_all':True,'form_view_ref': '$module$.form_view', 'tree_view_ref': '$module$.tree_view'}</field>
            <field name="domain">[('create_uid','=',uid)]</field>
</record>
```

缩写: oactionUrl  
名称: odoo打开链接动作  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record model="ir.actions.act_url" id="actUrl_open_baidu">
      <field name="name">打开百度</field>
      <field name="target">new,self</field>
      <field name="url">https://www.baidu.com</field>
</record>
```

缩写: oactionSev
名称: odoo服务器动作  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<record id="action_$action_name$" model="ir.actions.server">
                    <field name="name">$action_name$</field>
                    <field name="model_id" ref="model_$model_name$"/>
                    <field name="binding_model_id" ref="model_$model_name$"/>  <!--将该动作添加到该模型视图的选项中-->
                    <field name="state">code</field>
                    <field name="code">
                    action = records.action_$action_name$()
                    </field>
</record>
```

缩写: omenu  
名称: odoo顶级子菜单  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<menuitem name="子菜单名称" id="menu_$menu_id$" parent="$module$.$parent_menu_id$"
                  action="$module$.$act_win$" sequence="1"/>
```

缩写: omenu_root  
名称: odoo顶级菜单  
适用于: XML文本  
按照样式重新格式化: True  
模板文本:
```xml
<menuitem name="根菜单名称" groups="base.group_system" 
          id="nemu_$model_name$_root"
          web_icon="$module$,static/description/icon.png"  
          action="$module$.$act_win$" sequence="1"/>
      
```

缩写: opaction  
名称: odoo动作  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
val =  {
            'name': "$action_name$",
            'view_mode': 'tree,form',
            'res_model': '$module$.$menu_name$',
            'domain': [('id', '=', self.receivable_id.id)],
            'type': 'ir.actions.act_window',
            'context': {'form_view_ref': '$module$.form_view','tree_view_ref': '$module$.tree_view',
                        },
            'target': 'self',
    }
     
```

缩写: opmail  
名称: odoo继承消息  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
_inherit = ['mail.thread', 'mail.activity.mixin']
     
```

缩写: opmodel  
名称: odoo模型  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
class $model_name$(models.Model):
    _name = '$model$'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _description = '描述'
    _rec_name = "name"
    _order = 'code, name asc'
```

缩写: opmodel_wizard  
名称: odoo瞬态模型  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
class $model_name$_wizard(models.Model):
    _name = '$model$.wizard'
    _description = '向导'
```


缩写: opimport    
名称: odoo引入包  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
from odoo import models, fields, api
from odoo.exceptions import UserError, ValidationError
```

缩写: opactive  
名称: odoo启用字段  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
active = fields.Boolean(string='是否启用',default=True)
```

缩写: opinstall  
名称: odoo模块安装信息  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
'installable': True,
'application': True,
'sequence': '1',
'auto_install': False
```

缩写: opoption  
名称: odoo选项字段  
适用于: python脚本 
按照样式重新格式化: True  
模板文本:
```python
department_type_option = [(1,"临床"),(2,"医技"),(3,"医辅"),(4,"行政后勤")]
department_type = fields.Selection(department_type_option,string="科室类别")
```



^     new_odoo��ͼ_xml  F   <odoo>
    <data>
        
        
        
    </data>
</odoo>�     new_python_sript_py  �   #!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : ${NAME}.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : ${DATE}"    INTERNET_SCHEME_HTTPS         @!    INTERNET_SCHEME_HTTP        �??    WINHTTP_ACCESS_TYPE_NO_PROXY ֱ�ӷ��ʣ���ʹ�ô�����       �?�    WINHTTP_ACCESS_TYPE_DEFAULT_PROXY ͨ����̬������ע������õĴ������ʡ����̳кͲ�����IE�Ĵ������ã�����WinHttpSetDefaultProxyConfiguration�������á�        @D    WINHTTP_ACCESS_TYPE_NAMED_PROXY ͨ��ָ�����ƵĴ������ʡ�       @+    WINHTTP_NO_REFERER û����Դҳ��         5    WINHTTP_DEFAULT_ACCEPT_TYPES Ĭ���ļ�����         7    WINHTTP_FLAG_SECURE SSL/TLS��ȫ���ı�Э�顣       `A=    WINHTTP_AUTH_TARGET_SERVER ��֤Ŀ�꣺��վ��������         <    WINHTTP_AUTH_TARGET_PROXY ��֤Ŀ�꣺������������       �?@    WINHTTP_AUTH_SCHEME_BASIC ������֤��ʽ(BASE64����)��       �?3    WINHTTP_OPTION_DISABLE_FEATURE ���ù���      �O@*    WINHTTP_OPTION_ENABLE_FEATURE       �S@7    WINHTTP_DISABLE_COOKIES �����Զ�����COOKIES       �?0    WINHTTP_DISABLE_REDIRECTS �����ض���        @n    WINHTTP_OPTION_SECURITY_FLAGS ����֤����� #define WINHTTP_OPTION_SECURITY_FLAGS                31       ?@}    WINHTTP_ADDREQ_FLAG_ADD ����һ��Э��ͷ�����Э��ͷ�Ѵ�������ֵ�滻����WINHTTP_ADDREQ_FLAG_REPLACE��־һ��ʹ�á�       �A^    WINHTTP_ADDREQ_FLAG_REPLACE �滻����ɾ��һ��Э��ͷ�����ֵΪ����ɾ���������滻��       ��=    WINHTTP_QUERY_RAW_HEADERS_CRLF Э��ͷ�Ի��з��ָ�       6@0    WINHTTP_NO_HEADER_INDEX û��Э������         A    WINHTTP_ADDREQ_FLAG_ADD_IF_NEW ֻ�в����ڵ�ʱ�������       �A7    WINHTTP_ADDREQ_FLAG_COALESCE �ϲ���ͬ������       �AJ    WINHTTP_ADDREQ_FLAG_COALESCE_WITH_COMMA �ϲ���ͬ������ʹ�ö���       �AN    WINHTTP_ADDREQ_FLAG_COALESCE_WITH_SEMICOLON �ϲ���Ͷ������ʹ�÷ֺ�       pA    JTYPE_STRING     string     JTYPE_LONG     long     JTYPE_DOUBLE     double     JTYPE_OBJECT     object     JTYPE_ARRAY     array     JTYPE_BOOL     bool     JTYPE_NULL     null     JFTYPE_UNKNOW δ֪       �    JFTYPE_NULL ��             JFTYPE_OBJECT ����       �?    JFTYPE_ARRAY ����        @     JFTYPE_STRING �ı���       @    JFTYPE_LONG ������       @$    JFTYPE_DOUBLE ˫����С��       @    JFTYPE_BOOL �߼�       @    JFTYPE_COMMENT ע��       "@"    ����JSON����_��Ч δ֪       �    ����JSON����_�� ��         "    ����JSON����_���� ����       �?"    ����JSON����_���� ����        @$    ����JSON����_�ı� �ı���       @$    ����JSON����_���� ������       @(    ����JSON����_С�� ˫����С��       @"    ����JSON����_�߼� �߼�       @"    ����JSON����_ע�� ע��       "@    �̳߳�_δ����              �̳߳�_���ڹ���        �?    �̳߳�_���ڴ���         @    �̳߳�_��������        @    HEAP_ZERO_MEMORY         @    Full ȫ��             Parent ��       �?    Sub ��        @    Data ����       @!    REG_NONE δ����ֵ����         !    REG_BINARY ����������       @    REG_DWORD REG_DWORD       @    REG_SZ �ı�������       �?R    REG_DWORD_LITTLE_ENDIAN ���������ʽ32λ���֣�һ���ֵ���Ч�ֽ��Ǹ߶���       @O    REG_DWORD_BIG_ENDIAN ���������ʽ32λ���֣�һ���ֵ���Ч�ֽ��ǵͶ���       @#    REG_LINK ��һ���������       @H    REG_EXPAND_SZ ����ֹ�ַ�����������"&TEMP&"֮�໷������������        @Q    REG_MULTI_SZ �����������ֹ�ַ��������飬���鱻����ʵ�ʵĿ��ַ�������       @)    ABE_BOTTOM ϵͳ_ȡDOSִ�н��       @    SW_HIDE          !    STARTF_USESHOWWINDOW        �?!    STARTF_USESTDHANDLES        p@    STILL_ACTIVE       0p@k    ȡ����Ŀ¼  X   rem �����ǰ�ļ�

set curfile=%APPDATA%\JetBrains\<dataDirectoryName>
echo %curfile% 9    ����Ŀ¼  (   %APPDATA%\JetBrains\<dataDirectoryName> �    pythonǰ�ô���  k   #!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : ${NAME}.py
# Author: $ǩ��$
# Date  : ${DATE}      �汾��     v 1.0.1.20210722 �    ���¼�¼  t   2021.07.22
1.������odoo˲̬ģ�Ϳ�ݼ�
2.������odoo͸��ͼ�Ŀ�ݼ�

2021.07.14
1.�޸���odoo���������ǩ���µ�bug Y    ������Ϣ  H   ����&hjdhnx

qq 434857005

csdn:
https://blog.csdn.net/qq_32394351     s�jk�s ������s s s s s s          '����                                         � ?�   M         1         9   krnlnd09f2340818511d396f6aaf844c7e32557ϵͳ����֧�ֿ�:   iext27bb20fdd3e145e4bee3db39ddd6e64c20��չ����֧�ֿ�һ        �             �     (       @                                                                  	 �G7 �VC �_J �pW ��e ��d �pW �_J �VC �G7 	                                                               ��� H  �VC ��l �>1�J9.�M<S�N=q�O=��O=��N=q�M<S�J:/�>1��l �VC G  ���                                              # ��� �Q? ��� �H8"�N=r�P>��Q?�Q?��Q?��Q?��Q?��Q?��Q?��Q?�P>��N=r�H8"��� �Q? ��� #                                    c,"     �dN �A3�N=q�P?صQ?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P?خN=q�A3�dN     e-#                            e-# . �qX �I9*�P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��I9*�rY 2 e-#                     #     �rY �J:5�P>̵Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>̦J:6�rY     #              ��� �dN �I9*�P>̵Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>̤I9*�dN ���          ��� �Q? �A3�P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��A3�Q? ���      H  ��� �N=q�Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��N=q��� G      �VC �H8#�P?صQ?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��`O��bR��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P?ءH8#�VC     	 ��l �N=r�Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P=��_O�Ɂt�ʂu��dT��O=��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��N=r��l 	 �G7 �>1�P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��R@��P>��WF�΋�̇{�˅x�Б���ZH��P>��R@��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��>1�G7 �VC �J9.�Q?�Q?��Q?��Q?��Q?��Q?��Q?��P>��^M��|n�ʄw�Б���zl��l]��m^��wi�Б��˄w��|n��`P��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?�J9.�VC �_J �M<S�Q?��Q?��Q?��Q?��Q?��Q?��Q?��O=��rd��k[�̈|��qc��L:��O=��P=��N<��dT�˅y��gW��yk��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��M<S�_J �oW �N=q�Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��_N��}p�ˆz�А���~q�ҕ��Ә���`P��Q?��{m�А���bR��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��N=q�oW ��f �O=�Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q>��SB��Q?��ZI�۪����������ҕ���O=��dS�̉|��P=��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��O=��f ��f �O=�Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��TC��SA��O=�Ϗ����������ҕ���O=��dT�͉}��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��O=��f �oW �N=q�Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��`P��|o��vh��TB��]L�͊~�ώ���^N��R@��{m�΍���dT��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��N=q�oW �_J �M<S�Q?��Q?��Q?��Q?��Q?��Q?��Q?��O=��se��l\�ʃv��m^��N<��N<��N<��N<��gW�ˆy��gW��xj��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��M<S�_J �VC �J9-�Q?�Q?��Q?��Q?��Q?��Q?��Q?��P>��\K��xj��}o�ύ���}o��l]��n^��{m�΍���}o��yk��^M��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?�J9-�VC �F6 �>0�P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��Q?��P>��TB�Ɂt��r��{n�̇{��VD��P>��Q?��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��>0�F6 
 ��l �N=q�Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��]L��|o��|n��`O��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��N=q��l 
     �VC �G7"�P>ֵQ?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��[J��\L��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>֠G7"�VC      ; ��� �N=p�Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��N=p��� ;          �Q? �A3�P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��A3�Q?              ��� �cM �I9)�P>˵Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>ˤI9)�cM ���                    �qX �K:5�P>˵Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>˨K:5�qX                           e-# ) �oW �I9)�P>��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P>��I9)�oW ) e-#                            g.#     �dN �B3�N=n�P?ֵQ?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��Q?��P?֯N=n�B3�dN     g.#                                      ��� �R@ �զ �H8!�O=p�P>��Q?�Q?��Q?��Q?��Q?��Q?��Q?��Q?�P>��O=p�H8!�ة �R@ ���                                                    ; �VC ��e �?1�K:,�N<Q�O=m�O>}�O>}�O=m�N<Q�K:,�?1��e �VC ;                                                                    �H8 �VC �^I �kT �y^ �y^ �kT �^I �VC �H8                                       �  �  ?�  �  �  �  �                                                                          �  �  �  �  �  �  ?�      `     	NIOIPIQIRISITIUIVIW	�Pr�Ur�HrPFr�?r@?r�ir`ir ir�hr@hr�gr           ����1                    ����   �������ʽ��        
                    ����   STJson                            ����   STJsonValue    h           ! " # $ % & ' ( ) * + , - . / 0 1 2 3             ����   �����_�̳߳�    (   4 5 6 7 8 9 : ; < =             ����   DOM    t   > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z             ����   DOM_����       [ \ ] ^             ����   _XPath    8   _ ` a b c d e f g h i j k l             ����   _XMenu       m n             ����
   ע�������    d   o p q r s t u v w x y z { | } ~  � � � � � � � �                    __HIDDEN_TEMP_MOD__      � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � �  	
 !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLM         R       ���ڳ���_����1       ������        X
   
                        ! " # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~  � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � �  	
 !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLM������ gr fr@er`dr�cr�br�ar�`r r@~r`}r�|r�{r�zr�yr yr xr@wr`vr�ur�tr�sr�rr rr qr@pr �r@�r`�r��r��r��r��r �r �r@�r`�r��r��r��r��r �r �r@�r �r@�r`�r��r��r��r��r �r �r@�r`�r��r��r��r��r �r �r@�r �r@�r`�r��r��r��r�r �r �r@�r`�r��r��r��r�r �r �r@�r �r@�r`�r��r��r��r�r �r �r@�r`�r��r��r��r�r �r �r@�r �r@�r`�r��r��r��r��r �r �r@�r`�r��r��r��r��r �r �r@�r �r@�r`�r��r��r��r��r �r �r@�r`�r��r��r��r��r �r �r@�r �r@�r`�r��r��r��r��r �r �r@�r`�r��r��r��r��r �r �r@�r �r@�r`�r��r��r��r��r �r �r@�r`�r��r��r��r��r �r �r@�r s@s`s�s�s�
s�	s 	s s@s`s�s�s�s�s s s@ s s@s`s�s�s�s�s s s@s`s�s�s�s�s s s@s /s@.s`-s�,s�+s�*s�)s )s (s@'s`&s�%s�$s�#s�"s "s !s@ s ?s@>s`=s�<s�;s�:s�9s 9s 8s@7s`6s�5s�4s�3s�2s 2s 1s@0s Os@Ns`Ms�Ls�Ks�Js�Is Is Hs@Gs`Fs�Es�Ds�Cs�Bs Bs As@@s _s@^s`]s�\s�[s�Zs�Ys Ys Xs@Ws`Vs�Us�Ts�Ss�Rs Rs Qs@Ps os@ns`ms�ls�ks�js�is is hs@gs`fs�es�ds�cs�bs bs as@`s s@~s`}s�|s�{s�zs�ys ys xs@ws`vs�us�ts�ss�rs rs qs@ps �s@�s`�s��s��s��s��s �s �s@�s`�s��s��s��s��s �s �s  	     �   _�����ӳ���   ���ӳ����ڳ�������������ִ��   8   �%�%            �   �Ƿ����Ա      �   mode          ,          q   �   �   {  �  �  �  �       �   �  {  �     �   �        �   �   �   �  0   R      j   :  j�               68 R7  j4               68 R9	    R7!               68 R9	    R7      �j4               68�%7!L��          6l               6!&               68�%7  j4               68�%7!�               6!               6=   ��ǰ�����Թ���Ա�������еĳ��򣬿��ܻᵼ��Ȩ�޲��������ʧ��      �Ƿ��л�������Աģʽ?       �?l               6!&               68�%7        jM��          6j               6Rsj    ��          6Rsj    ��          6j              ���Ը���������Ҫ����������ֵ 6        NI�     �   ����J   ����ָ�����������ʽ�ı�����һ���������ʽ���󡣱������е�ԭ�����ݽ����ͷ�           \  �%�%�%�%�%�%    ;   T   �     O  7     �   �������ʽ�ı� ���硰������4\.0(ģ��|֧�ֿ�)?��      �   ���������ı�  �     �  �Ƿ����ִ�Сд ��������,Ĭ��Ϊ��,�����ִ�Сд; ��Ϊ���ִ�Сд;������ָ������������ʽ�ڴ����ɹ������ƥ�䡢�������滻ʱ���Ƿ����ִ�Сд; -    �  �Ƿ�ƥ����� ��������,Ĭ��Ϊ��,����ƥ�����; �������ԱֵΪ�棬�ַ���^������ƥ��Ŀ���ı��Ŀ�ͷ������ƥ��Ŀ���ı��л��з����ַ�(10)���ַ�(13)�� #���з����ĺ��棻�ַ���$������ƥ��Ŀ���ı��Ľ�β������ƥ��Ŀ���ı��л��з���ǰ�档�����ַ���^������ƥ��Ŀ���ı��Ŀ�ͷ����$��Ҳ����ƥ��Ŀ���ı��Ľ�β�� 1     �  �Ƿ�ȫ��ƥ�� �������գ�Ĭ��Ϊ�棬ȫ��ƥ�� �     �  �Զ��滻���� �ɿա�Ĭ��Ϊ���滻��˵�����������ʽ�ı�Ϊ��formhash" value="7b4aa6c5��������������Ŵ����������鷳��ֱ�ӰѴ˲�������Ϊ�棬��"���� #���� �ٴ������Ϳ����ˣ��磺��formhash#���� value=#����7b4aa6c5��                           j    ��          6NI�          �鿴                                              j    ��          6NI�     �
   ȡ�����ı�Z   �������ı���ʽ��ʾ���������ʽ������ö�����δ�������򷵻ؿ��ı���������Ϊ�߼������Ա����                                          j    ��          6NI�     �   �滻    �滻���������ʽ�������ҵ����ı�           1   �%    %     �  �����滻���ı� �����滻���ı�                           j    ��          6NI�    �
   ȡƥ������   ȡ��������ƥ�䵽������                                          j    ��          6NI�     �
   ȡƥ���ı�   ȡ��������ƥ�䵽���ı�           �   �% %    "       �   ƥ������ ����ֵ��1��ʼ }    �  ��ʼλ�� ���Ա�ʡ�ԣ��ṩ��������ʱֻ���ṩ��������������óɹ��󣬱��������ȡ�õ����ı��������������ı��е���ʼλ��                           j    ��          6NI�     �   ȡ��ƥ���ı�    ȡ����������ӱ���ʽƥ�䵽���ı�           ,  %%%    "   �       �   ƥ������ ����ֵ��1��ʼ m    �   �ӱ���ʽ���� ��ȡ��ֵ���ӱ���ʽ,�ò�����Ӧ���������ʽ�е�һ���ӱ���ʽ��Բ����"( )"Ϊ���,������1��ʼ }    �  ��ʼλ�� ���Ա�ʡ�ԣ��ṩ��������ʱֻ���ṩ��������������óɹ��󣬱��������ȡ�õ����ı��������������ı��е���ʼλ��                           j    ��          6NI�    �   ȡ��ƥ������    ȡ����������ӱ���ʽƥ�䵽������                                          j    ��          6OI�          SetFormatBlankStr:   ���ø�ʽ��ʱ�Ŀհ�������ݡ�Ĭ������Ϊ�ĸ���ǿո�    ��              %         �   text                            j    ��          6OI�   PI   CreateLongValue   ���� ����/������ ��ֵJSON����              %        �   value                            j    ��          6OI�   PI   CreateDoubleValue   ���� С���� ��ֵJSON����              %        �   value                            j    ��          6OI�   PI   CreateStringValue   ���� �ı��� JSON����              %         �   value                            j    ��          6OI�   PI   CreateBoolValue   ���� �߼��� JSON����              %         �   value                            j    ��          6OI�   PI   CreateNullValue   ���� ��ֵ JSON����                                          j    ��          6OI�   PI   Parse   ���ı�����ΪJSON����           �   	%
%%       D        �  jsonString JSON�ı� !    A  result ����JSON�Ľ����Ϣ @     �  is_ucs_to_gbk �Ƿ�Unicode��\u������ת��ΪGBK��Ĭ�ϣ���                           j    ��          6OI�     �   ToJsonString   ת������ΪJSON�ı�           �   %%%%       v   �      PI  obj  b     �  style �Ƿ����÷�������Ĭ�ϣ�true�����Ϊ true �����ɵĽű����Զ���ʽ��Ϊ�����Ķ����ı� )     �  sort �Ƿ���ݼ�ֵ����Ĭ�ϣ�true     �  level �հ���伶��                           j    ��          6PI�          Clear   ���                                          j    ��          6PI�     �   Type$   ��ǰ�������͡��ο� JTYPE_ ��ͷ�ĳ���           :   %    .     �  value �������͡��ο� JTYPE_ ��ͷ�ĳ���                           j    ��          6PI�    �   Size   �����ǰ��������Ϊ                                          j    ��          6PI�   PI   Get   ͨ�����ƻ�ȡ����              %         �  name                            j    ��          6PI�   PI   GetAt   ͨ��λ�û�ȡ����           %   %        �  pos λ�á���1��ʼ                           j    ��          6PI�     �   Put
   �������           2   %%            �  name     PI  data                            j    ��          6PI�     �   Add   ����������顣              %       PI  obj ����                           j    ��          6PI�     �   Remove-   ɾ���¼�����ֻ��� #JTYPE_OBJECT ���͵Ķ���              %         �   name                            j    ��          6PI�     �   RemoveAt2   ɾ��ָ��λ�õĶ���ֻ��� #JTYPE_ARRAY ���͵Ķ���           I   %    =    �   pos λ��������ͨ�� Size() �������Ի�ȡ����������1��ʼ                           j    ��          6PI�     �   ContainsObject-   �Ƿ��������ֻ��� #JTYPE_OBJECT ���͵Ķ���              %         �  name ������                           j    ��          6PI�    �   Keys   ��ȡ��������м�(���ؼ�����)           +   %         �
  keySet �洢���м�������                           j    ��          6PI�     �   IsNull   �Ƿ�Ϊ��                                          j    ��          6PI�    �   AsLong   תΪ��������                                          j    ��          6PI�     �   AsString
   תΪ�ı���                                          j    ��          6PI�    �   AsDouble   תΪ˫���ȸ�����                                          j    ��          6PI�     �   AsBool
   תΪ�߼���                                          j    ��          6PI�          SetLongV   ���ó�����ֵ����������������Ͳ��� #JTYPE_LONG ������������ݲ�ת��Ϊ #JTYPE_LONG ��              %        �  value                            j    ��          6PI�       	   SetDoubleX   ����С���͡���������������Ͳ��� #JTYPE_DOUBLE ������������ݲ�ת��Ϊ #JTYPE_DOUBLE ��              %        �  value                            j    ��          6PI�       	   SetStringX   �����ı��͡���������������Ͳ��� #JTYPE_STRING ������������ݲ�ת��Ϊ #JTYPE_STRING ��              %         �  value                            j    ��          6PI�          SetBool   ����Ϊ�߼���              %         �   value                            j    ��          6PI�          SetNull   ����Ϊ��                                          j    ��          6PI�     �   ToJsonString   ת��ΪJSON�ı�                                          j    ��          6PI�    �   __OUT_DATA_ARRAY   ��������              %         �
  array                            j    ��          6PI�     �   __OUT_DATA_OBJ   ��������              %         �  name                            j    ��          6PI�          __IN_DATA_ARRAY   ��������               %         �   data                            j    ��          6PI�          __IN_DATA_OBJ   ��������           2   !%"%            �  name       �   data                            j    ��          6QI�     �   ����>   �����������̳߳أ�����ʼ�ȴ�����Ͷ�ݡ��ɹ������棬ʧ�ܷ��ؼ١�           �  #%$%%%    6   �   2    �  ����_�̳߳����� ͬʱ�������߳���������Ϊ 5      �  ����_�Ƿ���UI�߳� �����UI�߳��У����Զ�ִ�С������¼�������ֹ����ʱUI���������ڼ���������UI�߳�����Ի���١�����Ϊ �� �    �  ����_��ʼջ��С �������̵߳ĳ�ʼջ��С�����ֽ�Ϊ��λ��������4KB�ı�������С8KB(8192�ֽ�)�����Ϊ�ջ�0����ôĬ�Ͻ�ʹ������øú������߳���ͬ��ջ�ռ��С����һ��Ϊ1M (1048576�ֽ�)�����õ���̫�٣��κ������Windows�������Ҫ��̬�ӳ���ջ�Ĵ�С����                           j    ��          6QI�     �   ����o   �����̳߳ء��ɹ����Ѿ����ٷ����棬ʧ�ܷ��ؼ١���ʧ��ԭ��������̳߳��Ѿ������١��̳߳����ڴ��������˳�ʱʱ�䣩              &%'%(%    �  x  �   �  ����_���ٷ�ʽ 0=�������٣��ȴ���ǰ����ִ�к󷵻� �� ����1=�������٣��ȴ�Ͷ�ݽ�ȥ������ȫ��ִ����Ϻ󷵻� �� ����2=ǿ�����٣���������������������� ��  ע�⣺�˷�ʽִ�гɹ��󲻴����̳߳��Ѿ����٣���Ȼ�ǰ��������������� ��ǰ����ִ����Ϻ��̳߳ز����������١�����3=ǿ����������(������������������������� �� ��ע�⣺�˷�ʽִ�гɹ��󲻴����̳߳��Ѿ����٣���Ȼ�ǰ��������������� Ͷ�ݽ�ȥ������ȫ��ִ����Ϻ��̳߳ز����������١�)����ʾ��ִ��ǿ�����ٺ��ͨ�� ȡ_״̬() ����������̽���̳߳ص�ǰ��״̬�� z    �  ����_��ȴ�ʱ�� ע�⣺�˲���ֻ�Է�ǿ��������Ч����λ�����룬���ջ� 0 һֱ�ȴ��� �����˳�ʱʱ����������� �� ��      �  ����_�Ƿ���UI�߳� �����UI�߳��У����Զ�ִ�С������¼�������ֹ����ʱUI���������ڼ���������UI�߳�����Ի���١�����Ϊ ��                           j    ��          6QI�     �   Ͷ������,   ���̳߳���Ͷ�����񡣳ɹ������棬ʧ�ܷ��ؼ١�           �   )%*%+%    %   H   !     �   ����_ִ�к��� &�ӳ���ָ��     �  ����_����һ ���ӵĲ���1     �  ����_������ ���ӵĲ���2                           j    ��          6QI�     �   Ͷ������_int,   ���̳߳���Ͷ�����񡣳ɹ������棬ʧ�ܷ��ؼ١�           �   ,%-%.%    ;   ^   7    �   ����_ִ�к��� ������ָ�� �� ������(&�ӳ���ָ��)     �  ����_����һ ���ӵĲ���1     �  ����_������ ���ӵĲ���2                           j    ��          6QI�    �   ȡ_�����߳���   ���е��߳�������                                          j    ��          6QI�    �   ȡ_ִ���߳���   ����ִ�е�����������                                          j    ��          6QI�    �   ȡ_����������   �ȴ�����������������                                          j    ��          6QI�    �   ȡ_�̳߳�����   ����ʱ���������                                          j    ��          6QI�     �   ȡ_�Ƿ����,   �̳߳ش��ڳ��׿���״̬��û���κ�������ִ�С�                                          j    ��          6QI�    �   ȡ_״̬.   0=δ������1=���ڹ�����2=���ڴ�����3=�������١�                                          j    ��          6RI�     �   ����                                              j    ��          6RI�     �   ����                  /%         �   html�ı�                            j    ��          6RI�          _____�̳�______   �ڲ�ʹ��,�ⲿ����              0%       0    ����_����                            j    ��          6RI�   SI   ȡ�ڵ�_���ڵ���_����_   TagName �����ڽ�����������,���صĶ���һ������ ��Ч,------------��Ҫ.������������ (��body��, )               1%         �   ����_�ڵ���                            j    ��          6RI�   SI   ȡ�ڵ�_��Name_����   Name   ��Ч              2%         �   Name                            j    ��          6RI�   SI   ȡ�ڵ�_��Class_����)   Class ������Ч,.������������ (��body��, )              3%         �   class                            j    ��          6RI�   SI   ȡ�ڵ�_����_ȫ���ӽڵ�0   css����ʽ ������Ч.---.������������ (��body��, )                                          j    ��          6RI�   SI   ȡ�ڵ�_����_ȫ�����0   css����ʽ ������Ч.---.������������ (��body��, )                                          j    ��          6RI�   SI	   _css_����   css����ʽ ����              4%         �  css����ʽ                            j    ��          6RI�   SI
   _css_����2   css����ʽ ����              5%         �  css����ʽ                            j    ��          6RI�   RI   _css_1   css����ʽ ֻ�����׸�ƥ����              6%         �   css����ʽ                            j    ��          6RI�   RI   ȡ�ڵ�_��id_1                  7%         �   ����_ID                            j    ��          6RI�   RI
   ȡ���ڵ�_11   css����ʽ ������Ч......������������ (��body��, )                                          j    ��          6RI�   RI   _Body_                                              j    ��          6RI�   RI   ȡ���_iframe   iframe                                          j    ��          6RI�     �   �Ƿ���ĳ����   ����               8%         �   ������_����                            j    ��          6RI�     �   �Ƿ���_����   ����                                          j    ��          6RI�     �   �Ƿ����ӽڵ�	   so   ����                                          j    ��          6RI�    �
   ȡ�ڵ�����   ĳ�����ִ���ĳ������,��Ҫ����                                          j    ��          6RI�     �   ȡ����ֵ_��������   value   ����               9%         �   ������_����                            j    ��          6RI�     �   ȡ�ڵ���   ��ǩ��                                          j    ��          6RI�     �   ȡtitle   ����                                          j    ��          6RI�     �   ȡID   id                                          j    ��          6RI�     �   ȡclass                                              j    ��          6RI�     �   ȡouterText                                              j    ��          6RI�     �   ȡinnerText                                              j    ��          6RI�     �   ȡtextContent   ���ڵ�ɼ��ַ���                                          j    ��          6RI�     �   ȡinnerHTML   ȫ�����Դ��,�������Լ�                                          j    ��          6RI�     �   ȡouterHTML   ȫ�����Դ��,�����Լ�                                          j    ��          6SI�          _____�̳�______   �ڲ�ʹ��,�ⲿ����              :%       0    ����_����                            j    ��          6SI�   RI   _   ȡ��Ա           /   ;%    #    �  ���� ��1��ʼ,Ϊ�վ��ǵ�һ��                           j    ��          6SI�   RI   ȡ��Ա   ȡ��Ա           /   <%    #    �  ���� ��1��ʼ,Ϊ�վ��ǵ�һ��                           j    ��          6SI�    �   ȡ��Ա��   ȡ��Ա��                                          j    ��          6TI�    �   Instance               h   =%>%?%@%       %   6       �  pointer      �  Type       �  Keys       �  Value                            j    ��          6TI�    �   Finds               N   A%B%C%       %       �  pointer      �   Type       �   Keys                            j    ��          6TI�    �   XPath               h   D%E%F%G%       %   6       �   pointer      �   Type       �   Link       �  Value                            j    ��          6TI�     �   getValue                  H%        �   pointer                            j    ��          6TI�     �   getKeys                  I%        �   pointer                            j    ��          6TI�          setKeys               5   J%K%           �   pointer       �   Keys                            j    ��          6TI�    �   getSub                  L%        �   pointer                            j    ��          6TI�          setValue               6   M%N%           �   pointer       �   Value                            j    ��          6TI�    �   getNums                  O%        �   pointer                            j    ��          6TI�    �   getType                  P%        �   pointer                            j    ��          6TI�    �   getThis                  Q%        �   pointer                            j    ��          6TI�          setType               5   R%S%           �   pointer      �   type                            j    ��          6TI�    �   Next                  T%        �   pointer                            j    ��          6TI�    �   Prev                  U%        �   pointer                            j    ��          6UI�          Load               2   V%W%            �   Link      �  Func                            j    ��          6UI�    �   View               E   X%Y%Z%              �   hWnd  
    �  x  
    �  y                            j    ��          6VI�    �   ö������3   ö��ָ���������µ�����(�ɹ���������Ŀ��,ʧ�ܷ���-1)           B   [%\%            �   ������       �  ���� ��ȡ����������                           j    ��          6VI�    �   ö�ټ���1   ö��ָ���������µļ���(�ɹ����ؼ�����,ʧ�ܷ���-1)           �   ]%^%_%`%       2   Q        �   ������       �  ���� ��ȡ�ļ�������      �  ��ֵ ��Ӧ�����ļ�ֵ     �  ���� ��Ӧ��ֵ������                           j    ��          6VI�     �
   ȡ��������   ʧ�ܷ��ؿ��ı�           �   a%b%    \   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters -     �  ���� �磺3600�����ս�ȡ��һ����(Ĭ��)                           j    ��          6VI�     �   �Ƿ����7   �ж�ָ��ע��������(����)�Ƿ����(���ڷ�����,���򷵻ؼ�)           m   c%d%    !        �   ������ ���жϵ������� 8     �  ���� ���жϵļ���.���Ϊ����ֻ�ж��������Ƿ����                           j    ��          6VI�     �   ˢ����&   ��������������������ĸĶ�ʵ��д�����              e%         �   ������                            j    ��          6VI�     �   д�ֽڼ�
   [REG_NONE]           z   f%g%h%i%       $   9        �   ������       �   ����       �   ��д��ֵ      �  ���� �ɿգ�д�������                           j    ��          6VI�     �   ȡ�ֽڼ�
   [REG_NONE]           a   j%k%l%       $        �   ������       �   ����  !    �  ���� �ɿգ�ȡ�����ݵ�����                           j    ��          6VI�     �
   дע����Ex   ����д�����б�ܵ�ע����           �   m%n%o%p%q%       *   C   X       �   ��Ŀ¼       �   ע���·��       �   ע���������       �   ��д��ֵ      �  д������ #REG_                           j    ��          6VI�     �	   дDWORDֵ    [REG_DWORD]�ɹ�������,ʧ�ܷ��ؼ�           �   r%s%t%    \   u   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters      �   ���� �磺3600     �   ��д��ֵ �磺0                           j    ��          6VI�    �	   ȡDWORDֵ   [REG_DWORD]           �   u%v%    \   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters      �   ���� �磺3600                           j    ��          6VI�     �
   д������ֵ!   [REG_BINARY]�ɹ�������,ʧ�ܷ��ؼ�           �   w%x%y%    \   u   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters      �   ���� �磺3600      �   ��д��ֵ                            j    ��          6VI�     �
   ȡ������ֵ   [REG_BINARY]           �   z%{%    \   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters      �   ���� �磺3600                           j    ��          6VI�     �
   д�ַ���ֵ   [REG_SZ]�ɹ�������,ʧ�ܷ��ؼ�           �   |%}%~%    \   u   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters      �   ���� �磺3600      �   ��д��ֵ                            j    ��          6VI�     �
   ȡ�ַ���ֵ   [REG_SZ]           �   %�%    \   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters      �   ���� �磺3600                           j    ��          6VI�     �   д���ַ���ֵ#   [REG_MULTI_SZ]�ɹ�������,ʧ�ܷ��ؼ�           �   �%�%�%    \   u   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters      �   ���� �磺3600      �   ��д��ֵ                            j    ��          6VI�     �   ȡ���ַ���ֵ   [REG_MULTI_SZ]           �   �%�%    \   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters      �   ���� �磺3600                           j    ��          6VI�     �   д�������ַ���ֵ$   [REG_EXPAND_SZ]�ɹ�������,ʧ�ܷ��ؼ�           �   �%�%�%    \   u   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters      �   ���� �磺3600      �   ��д��ֵ                            j    ��          6VI�     �   ȡ�������ַ���ֵ   [REG_REG_EXPAND_SZ]           4   �%�%            �   ������       �   ����                            j    ��          6VI�     �   ɾ����$   ɾ��ָ���������Լ����������������ֵ           7   �%    +     �   ������ ��ɾ����������,β����Ҫ��"\"                           j    ��          6VI�     �   ɾ������   ɾ��ָ�����µ�ĳ������           V   �%�%    )   %     �   ������ ��ɾ���������ڵ�������      �   ���� ��ɾ���ļ���                           j    ��          6VI�     �   ȡ�ַ���ֵ_CMD   ��CMD��ȡ��ʽȡָ���ַ���ֵ           �   �%�%�%    \   x   X     �   ������ �磺HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\NetBT\Parameters     �  ���� �磺#REG_SZ      �   ���� �磺3600                           j    ��          6VI�     �   ϵͳ_ȡDOSִ�н��6   ע��:�����������,һֱ��cmd�е�����ִ����Ϻ�Ż᷵��.              �%         �   �������ı�                            j    ��          6VI�     �	   ����_��ʱ)   ��ռ��cpu�����ڲ���������Ӱ����������ִ��           �   �%�%    3   /    �  ��ʱ��� 1000���� = 1��  ����Ϊ���޵ȴ� 9    �  ��ʱ��λ Ĭ��Ϊ����  0=����  1=��  2=����  3=Сʱ                           j    ��          6VI�     �   ϵͳ_�Ƿ�64λ����ϵͳ   �Ƿ����棬���Ƿ��ؼ�                                          j    ��          6VI�    �	   ����_Call   ���ڼƴ�ѭ����ʹ��           �   �%�%�%�%�%�%       )   ;   M   _       �   �ӳ���ָ��      �  ����1      �  ����2      �  ����3      �  ����4      �  ����5                            j    ��          6W	�     �   ��ҳ_Э��ͷ_ȡ��Ϣ3   ȡ��Э��ͷ�е�ĳ��ֵ ����302��תЭ��ͷ�е� Location           J   �%�%            �   ��_ԴЭ��ͷ       �   ��_���� ���磺Location                           j    ��          6W	�    �   �ڲ�_�����Ա�Ƿ����_�ı�               6   �%�%            �  ����       �   Ҫ�ж�ֵ                            j    ��          6W	�     �   �ڲ�_�����Ա�Ƿ����1   Cookie����ר��           6   �%�%            �  ����       �   Ҫ�ж�ֵ                            j    ��          6W	�     �   ��ҳ_Cookie�ϲ�����   ���ظ��º��Cookie           :   �%�%            �  ��Cookie       �   ��Cookie                            j    ��          6W	�     �   ��ҳ_����_����   ʹ��WinHttp�Ķ���ʽ������ҳ           m  �%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%    ;   �   �   �     ;  ^  �  �  �     K  h  �  �  �     �  7     �   ��ַ ��������ҳ��ַ,�������http://����https:// S    �  ���ʷ�ʽ 0=GET 1=POST 2=HEAD 3=PUT  4=OPTIONS  5=DELETE  6=TRACE  7=CONNECT *     �  �ύ��Ϣ "POST"ר��   �Զ�UTF8���� &     �  �ύCookies �����ύʱ��cookie       �  ����Cookies ���ص�Cookie )     �  ����Э��ͷ һ��һ�����û��з�����      �  ����Э��ͷ ���ص�Э��ͷ >    �  ����״̬���� ��ҳ���ص�״̬���룬���磺200��302��404�� '     �  ��ֹ�ض��� Ĭ�ϲ���ֹ��ҳ�ض��� !     �  �ֽڼ��ύ �ύ�ֽڼ����� ,     �  ������ַ ������ַ����ʽΪ 8.8.8.8:88 '    �  ��ʱ ��|Ĭ��Ϊ15��,-1Ϊ���޵ȴ�      �  �����û��� �û���      �  �������� ���� -    �  ������ʶ ������ʶ��Ĭ��Ϊ1��0Ϊ·���� 1   0    ����̳� �˴��������ṩ���󣬲����������� 5     �  �Ƿ��Զ��ϲ�����Cookie Ĭ��Ϊ�棬�Զ��ϲ����� f     �  �Ƿ�ȫ��ҪЭ��ͷ ������Э��ͷΪ��ʱ�Զ����ӱ�Ҫ��UAЭ��ͷ Ĭ��Ϊ�棬�ٽ��������ӷǴ���Э��ͷ G     �  �Ƿ���Э��ͷ��Сд ��Э��ͷ�еļ�������ĸ����Ϊ��д  Ĭ��Ϊ��                           j    ��          6W	�          �߳�_ȡ��COM��M   ȡ��COM��ĳ�ʼ������������߳�ͷ�������� �߳�_��ʼ��COM�� ����β�����������                                          j    ��          6W	�          �߳�_��ʼ��COM��e   ��ʱִ���̵߳�ʱ�򣬻��Զ��رգ���ʱ�������ڶ��̵߳ĳ����ﴴ��COM����ǰ�ȳ�ʼ����һ���߳�ֻ�ܵ���һ��                                          j    ��          6W	�     �   ��ҳ_����Э��ͷ    ��Э��ͷ�еļ�������ĸ����Ϊ��д           "   �%         �   ��_ԭʼЭ��ͷ                            j    ��          6W	�     �   ��ҳ_����Э��ͷex    ��Э��ͷ�еļ�������ĸ����Ϊ��д           "   �%         �   ��_ԭʼЭyiͷ                            j    ��          6W	�     �
   ��ҳ_����S�   Դ����[�֩��]�ṩ,ʹ��WinHttp�� API��ʽ������ҳ,��������ǡ�?�����ѯ����Э��ͷ�Ƿ��С�Content-Encoding: gzip����ʾgzipѹ������ҳ������ ��ҳ_GZIP��ѹ()�����ѹ��������������룬�򷵻�ԭʼ�ı���������ת�����룬ʧ�ܷ��ؿ��ı�����ȡ��״̬�ı���             �%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%    ;   �   �   �   �   U  x  �  �  �  "  7  L  �    ,  a  �    )  7     �   ��ַ ��������ҳ��ַ,�������http://����https:// T    �  ���ʷ�ʽ 0=GET 1=POST 2=HEAD  3=PUT  4=OPTIONS  5=DELETE  6=TRACE  7=CONNECT      �  �ύ��Ϣ POSTר�� &     �  �ύCookies �����ύʱ��cookie       �  ����Cookies ���ص�Cookie S     �  ����Э��ͷ һ��һ�����û��з�����,������д����ֵ���ı�ֵ,��ֹ�򴫲���������      �  ����Э��ͷ ���ص�Э��ͷ '     �  ��ֹ�ض��� Ĭ�ϲ���ֹ��ҳ�ض��� 2     �  ��վ��¼�û��� �Զ���¼��ҳ�û��� ��·����      �  ��վ��¼����  ,     �  ������ַ ������ַ����ʽΪ 8.8.8.8:88      �  �����ʺ�       �  ��������  Z    �  ��ʱʱ�� ���Ա�ʡ�ԣ���λ���룬Ĭ��30�룬����ṩ����0����ֵ�����޸Ĳ�����ʱʱ�䡣 e     �  �����ض��� ���Ա�ʡ�ԣ��ṩ����ʱֻ���ṩ�ı��ͱ��������ڵ������ض���ʱȡ��ҳ���ض���ĵ�ַ��      �  ����״̬�ı�  1     �  ����ԭʼ���� ���Ա�ʡ�ԣ�����ԭʼ��ҳ���� 5     �  �Ƿ��Զ��ϲ�����Cookie Ĭ��Ϊ�棬�Զ��ϲ����� f     �  �Ƿ�ȫ��ҪЭ��ͷ ������Э��ͷΪ��ʱ�Զ����ӱ�Ҫ��UAЭ��ͷ Ĭ��Ϊ�棬�ٽ��������ӷǴ���Э��ͷ !     �  �ֽڼ��ύ �ύ�ֽڼ����� G     �  �Ƿ���Э��ͷ��Сд ��Э��ͷ�еļ�������ĸ����Ϊ��д  Ĭ��Ϊ��                           j    ��          6W	�     �   Ansi��Unicode               6   �%�%            �   Ansi      �  ԭʼ����                            j    ��          6W	�     �   Unicode��Ansi               9   �%�%            �   Unicode      �  Ŀ�����                            j    ��          6W	�     �   �ı�_ȡ�ұ�M   ���ı����ұ߰� ��Ѱ�ҵ��ı� ��ʼѰ��, ȡ���ұ� (��1234567890��, ��5��, 1, ��)           �   �%�%�%�%    %   J   �   !     �   �����ҵ��ı� �����ҵ��ı� !     �   ��Ѱ�ҵ��ı� ��Ѱ�ҵ��ı� P    �  ��ʼѰ��λ�� ��Ϊ�գ�Ĭ��Ϊ1����������Ѱ�ң����Ϊ���������������Ѱ�ҡ� ,     �  �Ƿ����ִ�Сд Ĭ��Ϊ��,���ִ�Сд                           j    ��          6W	�     �   ����_Unicode��Ansi/   ��Unicode��ת��ΪAnsi�룻�ɹ�����ת������ı���           1   �%    %     �   Unicode ��ת����Unicode�ֽڼ�                           j    ��          6W	�     �   ����_BASE64����&   BASE64���봦�����ɹ����ر������ı���           +   �%         �   ���������� �������ֽڼ�                           j    ��          6W	�     �   ����_Ansi��Unicode1   ��Ansi��ת��ΪUnicode�룻�ɹ�����ת������ֽڼ���           j   �%�%    !        �   Ansi ��ת����Ansi�ı� 5     �  �Ǳ�׼Unicode���� Ĭ��Ϊ�٣�Ϊ��׼Unicode����                           j    ��          6W	�     �   ����_URL����   URL����           ]   �%�%            �   URL  9     �  �Ƿ�UTF8 �Ƚ��ı�������Ϊ�ı�,�ٴ�UTF8ת��GBK����                           j    ��          6W	�     �   ����_utf8��gb2312               !   �%         �   ��ת����Դ��                            j    ��          6W	�    �   ȡָ���ı�_                  �%         �   ����_�ı�                            j    ��          6W	�    �   ȡָ������_                  �%        �  ����_����                            j    ��          6W	�    �   ȡָ��С��_                  �%        �  ����_С��                            j    ��          6W	�    �   ȡָ��˫����_               $   �%        �  ����_˫����С��                            j    ��          6W	�    �   ȡָ���ֽڼ�_                   �%         �   ����_�ֽڼ�                            j    ��          6W	�    �   ȡָ��_ͨ����-   ȡ�����Ǳ�����ջ�еĵ�ַ,�� ȡ������ַ() һ��           )   �%          �  ���� ����֧����������                           j    ��          6W	�    �   ȡָ��_ͨ����_����-   ȡ�����Ǳ�����ջ�еĵ�ַ,�� ȡ������ַ() һ��              �%          �
  ����                            j    ��          6W	�    �   ȡָ��_�ı���1   ȡ�����Ǳ����ڶ��еĵ�ַ,�� ȡ�������ݵ�ַ() һ��              �%         �  �ı�                            j    ��          6W	�    �   ȡָ��_�ֽڼ���+   ȡ�����Ǳ����ѵ�ַ,�� ȡ�������ݵ�ַ() һ��              �%         �  �ֽڼ�                            j    ��          6W	�     �   ��������               `   �%�%�%       2       �  action 0,1      �   set_key �Ƿ񸴶�      �  set_value                            j    ��          6W	�     �   ����Ԫ�ַ�ת��               !   �%         �   Ҫ�������ı�                            j    ��          6W	�     �   �ı�����_ֻȡ����   ��һ����ҳԴ���� ֻȡ������           �   �%�%�%    %   W   !     �   Դ�ı� Ҫȡ�����ֵ�Դ�ı� .     �  �Ƿ����� �ɿգ�Ĭ��Ϊ�� ��ʹ������ʽ -     �  �Ƿ�ȥ���ո�Ϳ��� ��Ϊ�գ�Ĭ��Ϊ�١�                           j    ��          6W	�     �	   _ֻȡ����                  �%         �   �ַ���                            j    ��          6W	�     �   �ı�����_ֻȡ��ĸ   ��һ����ҳԴ���� ֻȡ��ĸ           u   �%�%    %   !     �   Դ�ı� Ҫȡ����ĸ��Դ�ı� <    �  ��Сд���� Ĭ��Ϊ0  0=ȡ��Сд  1ֻȡСд  2ֻȡ��д                           j    ��          6W	�     �   �ı�����_ֻȡ����   ��һ����ҳԴ���� ֻȡ����           -   �%    !     �   Դ�ı� Ҫȡ�����ŵ�Դ�ı�                           j    ��          6W	�     �   �ı�����_ֻȡ����   ��һ����ҳԴ���� ֻȡ����           -   �%    !     �   Դ�ı� Ҫȡ�����ֵ�Դ�ı�                           j    ��          6W	�     �   �ı�_�Ƿ�Ϊ����%   �м䲻���пո�,�ж�ָ���ı��Ƿ�������              �%         �   ��_�ı�                            j    ��          6W	�     �   �ı�_ȡ���$   ���ı�����߰� ��Ѱ�ҵ��ı� ��ʼѰ��             �%�%�%�%    %   J   �   !     �   �����ҵ��ı� �����ҵ��ı� !     �   ��Ѱ�ҵ��ı� ��Ѱ�ҵ��ı� P    �  ��ʼѰ��λ�� ��Ϊ�գ�Ĭ��Ϊ1����������Ѱ�ң����Ϊ���������������Ѱ�ҡ� E     �  �Ƿ����ִ�Сд ��ʼֵΪ���١���Ϊ�治���ִ�Сд��Ϊ�����֡�                           j    ��          6W	�     �   �ı�_ɾ��β��   ɾ��һ���ı�ǰ��Ŀո�              �%         �   Դ�ı�                            j    ��          6W	�     �   �ı�_ɾ������   ɾ���ı����еĿհ���           !   �%         �   Ҫ�������ı�                            j    ��          6W	�     �   �ı�_��Сд   ����ĸת����Сд           -   �%    !     �   Ҫת�����ı� Ҫת�����ı�                           j    ��          6W	�     �   �ı�_����д   ����ĸת������д           -   �%    !     �   Ҫת�����ı� Ҫת�����ı�                           j    ��          6W	�     �	   �ı�_�滻   �����滻�ı���           �  �%�%�%�%�%�%�% %%%%%%%       x   �   $  B  `  ~  �  �  �  �    2       �   ԭ�ı�  a    �  �滻���еĴ��� �ɿգ�����ֵָ�������ı������滻�Ĵ��������ʡ�ԣ�Ĭ�Ͻ������п��ܵ��滻�� Z    �  �滻����ʼλ�� �ɿգ�����ֵָ�����滻���ı�����ʼ����λ�á����ʡ�ԣ�Ĭ�ϴ� 1 ��ʼ J     �  �Ƿ����ִ�Сд �ɿգ� ��ʼֵΪ���١������ִ�Сд��Ϊ�����ִ�Сд��      �   �����滻�����ı�1       �   �����滻�����ı�1       �  �����滻�����ı�2       �  �����滻�����ı�2       �  �����滻�����ı�3       �  �����滻�����ı�3       �  �����滻�����ı�4       �  �����滻�����ı�4       �  �����滻�����ı�5       �  �����滻�����ı�5                            j    ��          6W	�     �   �ı�_ʮ������ת�ı�   �����ı�           n   %%            �   ʮ�������ı� ��д =     �  �ָ���� �޷ָ���������գ��зָ��������д�ָ���š�                           j    ��          6W	�     �   �ı�_��ʮ������   ����ʮ�������ı�           !   	%         �   ��ת�����ı�                            j    ��          6W	�     �   �ı�_�Ƿ�Ϊ������                  
%         �   �ַ���                            j    ��          6W	�     �   �ı�_�Ƿ�Ϊ������   �Ǵ����ַ����棬���򷵻ؼ١�              %         �   ԭ�ı�                            j    ��          6W	�     �   �ı�_��ĳ��ͷ               R   %%%       !        �   msg       �   ��ͷ       �  �����ִ�Сд                            j    ��          6W	�     �   ����_URL����   URL����           �   %%%       `        �   ��������ı�  C     �  ��������ĸ���� ����Ҫ���롾��ĸ����.-�����԰Ѵ˲�������Ϊ�� 3     �  �Ƿ�UTF8 �Ȱ��ı�ת����UTF8����,�ٱ����URL                           j    ��          6W	�     �   ����_gb2312��utf8   gb2312��utf8           !   %         �   ��ת����Դ��                            j    ��          6W	�     �   �ı�_ȡ���м��ı�Q   ���磺��ȡȫ�ı�Ϊ��12345��,����Ҫȡ����3����<3>��ǰ��Ϊ��2����<3>�ĺ���Ϊ��4����           �  %%%%%    /   �   �   q  +     �   ��ȡȫ�ı� ���磺��ȡȫ�ı�Ϊ 12345 S     �   ǰ���ı� 3��ǰ��Ϊ��2��������ֱ���� #���ţ��磺"<font color=#����red#����>" S     �   �����ı� 3�ĺ���Ϊ��4��������ֱ���� #���ţ��磺"<font color=#����red#����>" �    �  ��ʼ��Ѱλ�� �ɿա�1Ϊ��λ�ã�2Ϊ��2��λ�ã�������ƣ������ʡ�ԣ���Ѱ���ֽڼ�������Ĭ�ϴ��ײ���ʼ���������ֽڼ�������Ĭ�ϴ�β����ʼ�� M     �  �Ƿ����ִ�Сд �ɿա���ʼֵΪ���١����� = ������    �� = ���ִ�Сд��                           j    ��          6W	�    �   �ı�_���ַָ�\   ��ָ���ı�,���ַָ������,����Ϊָ���ı���������,���س�Ա����,��ʶ���з���ȫ����ַ��ͺ���           \   %%            �   �ı� ��Ҫ�ָ���ı� )     �  ���ص����� ����ָ������������                           j    ��          6W	�     �   �ı�_ȥ�ظ��ı�   ȥ��ԭ�ı����ظ����ı�           k   %%            �   ԭ�ı�  D     �  �ָ�� ԭ�ı��������ݼ�ķָ��������磺---  ����Ϊ�����ַָ�                           j    ��          6W	�     �   �ı�_����ĸ�Ĵ�дb   ���ı��͡� ����ĸ��д ���ı������� FOXPRO �� foxpro������ Foxpro��ע�Ȿ���������Ϊ���ֵ��ı���Ч              %         �   Ӣ���ı�                            j    ��          6W	�     �   ���_������   www.eyuyan.la           $   %        �   ����_�����ָ���                            j    ��          6W	�     �	   ���_����               9   %%           �   ����_����      �   С��λ                            j    ��          6W	�     �	   ���_����               :    %!%           �  ��ʼ���      �  �������                            j    ��          6W	�     �   ���_������ĸ)   ������ѧϰ��Դ��Դ������վ��www.eyuyan.la              "%        �   ����_����                            j    ��          6W	�     �   ����_����ʽ����(   �ɹ����ؼ������ı������ʧ�ܷ��ؿ��ı�           X   #%$%            �   Text  3     �   ��λ ��������ʱʹ�ã���Ϊ�����ƣ���Ϊ�Ƕ���                           j    ��          6W	�     �   ����_��������   �����ҡ����ҡ����С�����           H   %%&%            �   Text  #     �   ��λ ��Ϊ�����ƣ���Ϊ�Ƕ���                           j    ��          6W	�     �   ����_���ż���                  '%         �   Text                            j    ��          6W	�     �   ����_�ڲ�����"   �Ӽ��˳����˷����㣬ʧ�ܷ��ؿ��ı�              (%         �   Text                            j    ��          6W	�     �   ����_URL����                  )%         �   url                            j    ��          6W	�     �   json_�Լ�ȡֵ               J   *%+%             �   json_text json�ַ���      �   key json������                           j    ��          6W	�   PI
   json_loads   json�ı�ת�ֵ�           &   ,%         �   json_text json�ı�                           j    ��          6W	�     �
   json_dumps   json�ֵ�ת�ı�           >   -%.%          PI   js_dict json�ֵ�      �  style                            j    ��          6W	�    �   json_��ȡ���м�   ������           A   /%0%          PI   js_dict json�ֵ�      �  key_list                            j    ��          6W	�     �   json_�Լ���ֵ               d   1%2%3%        :        �   json_text json�ַ���      �   key json������      �  value                            j    ��          6W	�     �   ʱ��_��ʱ���^   ��ָ������ʱ��ת��Ϊ10λ��13λʱ���,Ĭ������13λʱ�����13λ��1325252169718��10λ��1325252169           �   4%5%6%    *   f   &     �  ��_ʱ�� ��Ϊ�գ�Ĭ��Ϊ����ʱ�� 8     �  ��_ʮλʱ��� ������Ϊ��ʱ��������10λʱ������� k     �  ��_�Ƿ�ȡ��10λ �������Ϊ�棬��֤һ��ȡ������10λ���������10λ����ǰ�油0. ���Ϊ�٣���ֱ��ȡ��                           j    ��          6W	�     �   ʱ��_ʱ���ת�ı�>   ��һ��13λ��ʱ������磺1325252169718 ת�� 2011-12-30 21:36:09              7%         �   ʱ���                            j    ��          6W	�    �   ʱ��_ȡ��ʽ8   ȡ��ǰϵͳʱ����ʽ������ֵ��0��ʾ12Сʱ�ƣ�1��ʾ24Сʱ��                                          j    ��          6W	�     �   ʱ��_��ʽ��T   ��ʽ��ָ��������ʱ�䣬ʧ�ܷ��ؿ��ı�   GetTimeFormatA �ú���֧�ֵ�����ʱ����1600.1.1           [  8%9%:%;%       �          �   ��_����ʽ��ʱ��  k     �  ��_���ڸ�ʽ ����Ϊ�գ���ʽ��yyyy [��]��M [��],d [��],dddd [����]����;yyyy/M/d dddd(��/��/�� ���ڼ�) �     �  ��_ʱ���ʽ ����Ϊ�գ���ʽ��tt [���������],h [Сʱ],m [����], s [��] ����;hh:mm:ss(Сʱ:����:��),tt hh:mm:ss(��������� Сʱ:����:��)      �  ��_�Ƿ�Ϊ24Сʱ��                            j    ��          6W	�     �   �ֽڼ���ʮ������               #   <%         �   Ҫת�����ֽڼ�                            j    ��          6W	�     �   ʮ�����Ƶ��ֽڼ�               !   =%         �   ʮ�������ı�                            j    ��          6W	�    �   ȡʮ����   Hex            !   >%         �   ʮ�������ı�                            j    ��          6W	�     �
   ����ȡ���                  ?%         �   cmd                            j    ��          6W	�     �   �ļ�_ȡ��׺��                  @%         �   �ļ���                            j    ��          6W	�    �	   ʱ��_����T   ÿ������������һ��id�����Ҫ������ʱ����������ǰ����ʱ�ӹرգ�����ȫ�ֱ�������ʱ��           w   A%B%C%       4       �   ʱ������ 1000ms     �   ʱ�Ӿ��� 10ms '     �   �ص����� ��ʱִ�е��ӳ����ָ��                           j    ��          6W	�     �	   ʱ��_�ر�   �ر�ͨ��ʱ��_������ȡ��ʱ��id           E   D%    9    �   ʱ��ID ʱ�������ɹ�����id��ÿ���������»��һ��                           j    ��          6W	�    �   ���̹��Ӵ���               �   E%F%G%       R       �   icode  <    �   wparam ����״̬,256���̰���,257���̵���,260ALT������     �   lparam �ṹָ��                           j    ��          6W	�     �   ���_ȡ����   ȡ��һ������İټ��գ�           6   H%    *    �  ���ֻ�ȫƴ 0Ϊ���֣�����Ϊȫƴ����                           j    ��          6W	�     �   ���_ȡ��Χ����#   ��1-100֮���˫��������˫һ��           y   I%J%K%       3       �   ��ʼ�� �磺1     �   ������ �磺1000 *    �  ��˫ѡ�� 1Ϊ����2Ϊ˫,����Ϊȡ��˫                           j    ��          6W	�    �   ���_���ȡ���֐   ����һ��ָ����Χ�ڵ������ֵ����ʹ�ñ�����ȡһϵ�е������֮ǰ��Ӧ����ʹ�á�����������ӡ�����Ϊ�������������ʼ��һ������ֵ��������Ϊ�������           �   L%M%    Q   M    �  ��ȡ���������Сֵ ����������ڻ�����㡣�����������ʡ�ԣ�Ĭ��Ϊ 0�� O    �  ��ȡ����������ֵ ����������ڻ�����㡣�����������ʡ�ԣ�Ĭ��Ϊ���ޡ�                           j    ��          6W	�     �   ���_ȡ����   ȡ���õ��������           a   N%O%    #       �   ���� Ҫȡ�����ٸ����֣� *    �  ���ֻ�ȫƴ 0Ϊ���֣�����Ϊȫƴ����                           j    ��          6W	�    �   ��_���ȡλ��                  P%         �   ��_�ִ�                            j    ��          6W	�     �   ���_ȡ�ǳ�               f   Q%R%    $        �  �Ա� 0���������1�У�2Ů .    �  ���ֳ��� 0���������1����2�֣�2����3��                           j    ��          6W	�    �   _д�ڴ��ı�!   �ɹ������ڴ�ָ���ַ��ʧ�ܷ���0��           .   S%    "     �   str Ҫ��ŵ��ڴ���ı�����                           j    ��          6W	�     �   _���ڴ��ı�,   �ɹ�����Ԥ�ȱ�����ı����ݣ�ʧ�ܷ��ؿ��ı���           ~   T%U%    0   ,    �   ptr _д�ڴ��ı�() ���ص��ڴ�ָ���ַ :     �  IsFree ����/Ĭ��=�棬��ȡ���Ƿ��Զ�����/�ͷ��ڴ档                           j    ��          6W	�    �   _д�ڴ��ֽڼ�!   �ɹ������ڴ�ָ���ַ��ʧ�ܷ���0��           0   V%    $     �   bin Ҫ��ŵ��ڴ���ֽڼ�����                           j    ��          6W	�     �   _���ڴ��ֽڼ�0   �ɹ�����Ԥ�ȱ�����ֽڼ����ݣ�ʧ�ܷ��ؿ��ֽڼ���           �   W%X%    2   .    �   ptr _д�ڴ��ֽڼ�() ���ص��ڴ�ָ���ַ :     �  IsFree ����/Ĭ��=�棬��ȡ���Ƿ��Զ�����/�ͷ��ڴ档                           j    ��          6W	�     �   �����߳�_�ı�               8   Y%Z%            �   �ӳ���       �   ��������                            j    ��          6W	�    �   _������   ���ڴ�������              [%        �   ָ��                            j    ��          6W	�    �   _д����   д�ڴ������� ����д����ֵ           0   \%]%           �   ָ��      �   ֵ                            j    ��          6W	�    �	   _������Ex   ���ڴ������ʹ�ƫ��           .   ^%_%           �   ptr  
    �   i                            j    ��          6W	�       	   _д����Ex   д�ڴ������ʹ�ƫ�� �޷���ֵ           G   `%a%b%              �   ptr  
    �   i      �   data                            j    ��          6W	�    �   ��ص�_�����ຯ����ַM   �������ɵ���ͨ������ַ �����˼ǵ��ͷ�[ֻ�����������] [������ _��ʼ�� �����]           P   c%    D    �   ������� ��1��ʼ,([_��ʼ��]��[_����]������ʲôλ�ö���������                           j    ��          6W	�          ��ص�_�ͷ��ຯ����ַ@   �����ͷ����ɴ����ķ���ָ�룬����ȷ����Ļص��Ѿ�ͣ���˲����ͷ�           $   d%        �   ptr ���к���ָ��                           j    ��          6W	�    �   _Calli2   �����ӳ��� ������ָ�� 0-2������           O   e%f%g%       $       �   ָ��      �  ����һ      �  ������                            j    ��          6W	�    �   Calli0   �����ӳ��� ������ָ�� 0 ������              h%        �   ������ַ                            j    ��          6W	�    �   Calli1   �����ӳ��� ������ָ�� 1 ������           7   i%j%           �   ������ַ      �   ����1                            j    ��          6W	�    �   Calli2   �����ӳ��� ������ָ�� 2 ������           Q   k%l%m%       '       �   ������ַ      �   ����1      �   ����2                            j    ��          6W	�    �   Calli3   �����ӳ��� ������ָ�� 3 ������           k   n%o%p%q%       '   9       �   ������ַ      �   ����1      �   ����2      �   ����3                            j    ��          6W	�    �   Calli4   �����ӳ��� ������ָ�� 4 ������           �   r%s%t%u%v%       '   9   K       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4                            j    ��          6W	�    �   Calli5   �����ӳ��� ������ָ�� 5 ������           �   w%x%y%z%{%|%       '   9   K   ]       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5                            j    ��          6W	�    �   Calli6   �����ӳ��� ������ָ�� 6 ������           �   }%~%%�%�%�%�%       '   9   K   ]   o       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6                            j    ��          6W	�    �   Calli7   �����ӳ��� ������ָ�� 7 ������           �   �%�%�%�%�%�%�%�%       '   9   K   ]   o   �       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7                            j    ��          6W	�    �   Calli8   �����ӳ��� ������ָ�� 8 ������        	   �   �%�%�%�%�%�%�%�%�%       '   9   K   ]   o   �   �       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8                            j    ��          6W	�    �   Calli9   �����ӳ��� ������ָ�� 9 ������        
     �%�%�%�%�%�%�%�%�%�%       '   9   K   ]   o   �   �   �       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9                            j    ��          6W	�    �   Calli10   �����ӳ��� ������ָ�� 10 ������           "  �%�%�%�%�%�%�%�%�%�%�%       '   9   K   ]   o   �   �   �   �       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10                            j    ��          6W	�    �   Calli11   �����ӳ��� ������ָ�� 11 ������           =  �%�%�%�%�%�%�%�%�%�%�%�%       '   9   K   ]   o   �   �   �   �   �       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11                            j    ��          6W	�    �   Calli12   �����ӳ��� ������ָ�� 12 ������           X  �%�%�%�%�%�%�%�%�%�%�%�%�%       '   9   K   ]   o   �   �   �   �   �   �       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11      �   ����12                            j    ��          6W	�    �   Calli13   �����ӳ��� ������ָ�� 13 ������           s  �%�%�%�%�%�%�%�%�%�%�%�%�%�%       '   9   K   ]   o   �   �   �   �   �   �   �       �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11      �   ����12      �   ����13                            j    ��          6W	�    �   Calli14   �����ӳ��� ������ָ�� 14 ������           �  �%�%�%�%�%�%�%�%�%�%�%�%�%�%�%       '   9   K   ]   o   �   �   �   �   �   �   �         �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11      �   ����12      �   ����13      �   ����14                            j    ��          6W	�    �   Calli15   �����ӳ��� ������ָ�� 15 ������           �  �%�%�%�%�%�%�%�%�%�%�%�%�%�%�%�%       '   9   K   ]   o   �   �   �   �   �   �   �           �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11      �   ����12      �   ����13      �   ����14      �   ����15                            j    ��          6W	�    �   Callp0   �����ӳ��� �ӳ���ָ�� 0 ������              �%         �   ������ַ                            j    ��          6W	�    �   Callp1   �����ӳ��� �ӳ���ָ�� 1 ������           7   �%�%            �   ������ַ      �   ����1                            j    ��          6W	�    �   Callp2   �����ӳ��� �ӳ���ָ�� 2 ������           Q   �%�%�%       '        �   ������ַ      �   ����1      �   ����2                            j    ��          6W	�    �   Callp3   �����ӳ��� �ӳ���ָ�� 3 ������           k   �%�%�%�%       '   9        �   ������ַ      �   ����1      �   ����2      �   ����3                            j    ��          6W	�    �   Callp4   �����ӳ��� �ӳ���ָ�� 4 ������           �   �%�%�%�%�%       '   9   K        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4                            j    ��          6W	�    �   Callp5   �����ӳ��� �ӳ���ָ�� 5 ������           �   �% %%%%%       '   9   K   ]        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5                            j    ��          6W	�    �   Callp6   �����ӳ��� �ӳ���ָ�� 6 ������           �   %%%%	%
%%       '   9   K   ]   o        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6                            j    ��          6W	�    �   Callp7   �����ӳ��� �ӳ���ָ�� 7 ������           �   %%%%%%%%       '   9   K   ]   o   �        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7                            j    ��          6W	�    �   Callp8   �����ӳ��� �ӳ���ָ�� 8 ������        	   �   %%%%%%%%%       '   9   K   ]   o   �   �        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8                            j    ��          6W	�    �   Callp9   �����ӳ��� �ӳ���ָ�� 9 ������        
     %%% %!%"%#%$%%%&%       '   9   K   ]   o   �   �   �        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9                            j    ��          6W	�    �   Callp10   �����ӳ��� �ӳ���ָ�� 10 ������           "  '%(%)%*%+%,%-%.%/%0%1%       '   9   K   ]   o   �   �   �   �        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10                            j    ��          6W	�    �   Callp11   �����ӳ��� �ӳ���ָ�� 11 ������           =  2%3%4%5%6%7%8%9%:%;%<%=%       '   9   K   ]   o   �   �   �   �   �        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11                            j    ��          6W	�    �   Callp12   �����ӳ��� �ӳ���ָ�� 12 ������           X  >%?%@%A%B%C%D%E%F%G%H%I%J%       '   9   K   ]   o   �   �   �   �   �   �        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11      �   ����12                            j    ��          6W	�    �   Callp13   �����ӳ��� �ӳ���ָ�� 13 ������           s  K%L%M%N%O%P%Q%R%S%T%U%V%W%X%       '   9   K   ]   o   �   �   �   �   �   �   �        �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11      �   ����12      �   ����13                            j    ��          6W	�    �   Callp14   �����ӳ��� �ӳ���ָ�� 14 ������           �  Y%Z%[%\%]%^%_%`%a%b%c%d%e%f%g%       '   9   K   ]   o   �   �   �   �   �   �   �          �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11      �   ����12      �   ����13      �   ����14                            j    ��          6W	�    �   Callp15   �����ӳ��� �ӳ���ָ�� 15 ������           �  h%i%j%k%l%m%n%o%p%q%r%s%t%u%v%w%       '   9   K   ]   o   �   �   �   �   �   �   �            �   ������ַ      �   ����1      �   ����2      �   ����3      �   ����4      �   ����5      �   ����6      �   ����7      �   ����8      �   ����9      �   ����10      �   ����11      �   ����12      �   ����13      �   ����14      �   ����15                            j    ��          6W	�          _�ӳ��   API��ʽ �ص㣺��ռ��CPU��ϵͳ��Դ �����Դ����ӳٸ��ȶ��� �ӳ�һ��ʱ�䣬Ȼ�����ִ�к���ĳ�����롣�������Ժ���֧�ֿ��еġ���ʱ()�����ͬ���ǣ��������ڵȴ��ڼ������û�������������(������ť��)��           @   x%    4    �   �ȴ�ʱ�� ��λΪ���롣��ʾ��1000�������1�롣                           j    ��          6W	�       	   _�����¼��   ��ʱת�ÿ���Ȩ���Ա��� Windows ����ϵͳ�л��ᴦ�����������û����̻����������¼���ֱ������ϵͳ�������������������е������¼�������Ż᷵�ء�������Ϊ�м����                                          j    ��          6W	�    �   _ȡ����ʱ��k   ������ Windows ϵͳ����������Ϊֹ���������ĺ�������������Ϊ��������(�ɽ����������28��󷵻ظ���������)��                                          j    ��          6W	�     �   _������ָ��,   �������͵�ָ���ַת�����ӳ���ָ�뷽��ʹ�á�           L   y%    @    �   ������ָ�� �������ӳ���ָ�� ���磺��ص����ɵ�ָ���ַ��                           j    ��          6W	�     �	   �ڴ�_����    ���������ڴ棬Empty.exe ��ԭ�͡�           6   z%    *    �  ����_����ID 0������ �����������ڴ�                           j    ��          6W	�    �   �����߳�               &  {%|%}%~%    /   t   �   +     �   �ӳ���ָ�� �ṩ��ִ�е��ӳ����ָ�� A    �   �ӳ������ ���ṩ��ִ�е��ӳ���ĵ�һ����������֧�������� E     �   �Ƿ�����ִ�� ����ֵΪ�٣��������߳̽������𣬷�֮������ִ�� E    �  �߳�ID �ں˸������ɵ��̷߳�����߳�ID���ṩ����ʱֻ���ṩ����                           j    ��          6W	�          �����߳�.   �����ɣ������̣߳������ĵ�ǰ���ڹ���״̬���߳�           9   %    -    �   �߳̾�� �ɣ������̣߳����ص��߳̾��                           j    ��          6W	�          ��ֹ�߳�   ǿ����ֹ�߳�           9   �%    -    �   �߳̾�� �ɣ������̣߳����ص��߳̾��                           j    ��          6W	�          ����_��������ַASMQ   �Ա����ͱ�����ַ�Ľ�����ʽ�������������������ݣ�ע��������Ҫ����ͬ���͵�  -�Ǻ���           �   �%�%    -   )      �  ���� ��������ĳ������¿��������� M    �   ������ַ ������ַ�������� ȡ������ַ������ ȡ������ַ_ASM()  ȡ�õ�ַ                           j    ��          6W	�    �   json_ȡ�б�����               (   �%         �   json_text json�ַ���                           j    ��          6W	�     �   �����Ƿ�װ               5   �%    )     �   �������� �� YaHei Consolas Hybrid                           j    ��          6W	�     �   ����_��װ����               !   �%         �   �����ļ�·��                            j    ��          6W	�     �   �ļ�_ȡ�ļ���                  �%         �   �ļ�·��                            j    ��          6W	�     �   �ļ�_ȡĿ¼M   ȡ���ļ�����Ŀ¼��·��,�磺��_������:\012\3600.exe �ɹ������� ��_������:\012\           -   �%    !     �   ·���ļ��� �ļ���������ַ                           j    ��          6W	�     �   Ŀ¼_�Ƿ����!   ����һ��Ŀ¼��,�жϴ�Ŀ¼�Ƿ����           9   �%    -     �   ���жϵ�Ŀ¼�� �����Ŀ¼�����ᱻ�ı�                           j    ��          6W	�     �	   Ŀ¼_����R   �����༶Ŀ¼���ɹ������棬ʧ�ܷ��ؼ١����ָ��Ŀ¼����Ҳ�᷵���棬������Ŀ¼���ݡ�              �%         �   Ŀ¼·��                            j    ��          6W	�     �	   �ļ�_����*   �Ѿ����ڻ��ߴ���ʧ�ܷ��ؼ٣������ɹ�������           ^   �%�%    )   %     �   �ļ��ֽڼ� Ҫд���ļ����ֽڼ� !     �   �ļ�·�� ��д�����ļ�·��                           j    ��          6W	�     �   �ļ�_ȡ�����ļ���                  �%         �   �ļ�·��                            j    ��          6W	�    �   ϵͳ_��ʱ����_��װh   ʧ�ܷ���0������������óɹ����򷵻�ֵΪ���ӵ�������   ��װ���������ɾ�������ļ���������������ʾ����           �   �%    v     �   ����·�� ����Ч������ļ���,������Դ�ļ�(.FON)��δ�ӹ�λͼ����(.FNT)��δ�ӹ�TrueType(.TTF)��TrueType��Դ(.FON)                           j    ��          6W	�     �   ϵͳ_��ʱ����_ж��3   ͨ������£�ֻж���ɡ�ϵͳ_��װ���塱��װ��������Դ           3   �%    '     �   ����·�� ����Ч������Դ���ļ���                           j    ��          6W	�     �   ����_��װ����1               !   �%         �   �����ļ�·��                            j    ��          6W	�          �ض����ά����_����               D   �%�%           �
  ���ض�����������      �  ά����ֵ                            j    ��          6W	�          ���ļ�Ŀ¼               !   �%         �   path �ļ�Ŀ¼                           j    ��          6W	�     �   ����_����utf8�ı�               )   �%         �   filename ��������ļ�                           j    ��          6W	�     �   ����_Ansi��Utf8                  �%         �   ansi�ı�                            j    ��          6W	�     �   ����_Unicode��Utf8   ��Unicodeת����UTF8           "   �%         �   Unicode�ֽڼ�                            j    ��          6W	�     �   ����_д��utf8�ı�               C   �%�%            �   path �ļ�·��      �   txt ��д���ı�                           j    ��          6W	�     �   У��_ȡsha1   ����40λ��У������           3   �%    '     �   �ֽڼ����� Ҫȡ����ժҪ���ֽڼ�                           j    ��          6W	�     �
   У��_ȡmd5	   ȡ����MD5           �   �%�%�%    +   f   '     �   �ֽڼ����� Ҫȡ����ժҪ���ֽڼ� 7     �  ����ֵת�ɴ�д �ɿգ�Ĭ��Ϊ�١���=Сд  ��=��д #     �  �Ƿ�ȡ16λ �ɿգ�Ĭ��Ϊ32λ                           j    ��          6W	�     �   У��_ȡmd5_�ı�   ȡ�ı�MD5��֧�����ġ�             �%�%�%�%    0   �   �   ,     �   ��ȡMD5���ı��� Ҫȡ����ժҪ���ֽڼ� U     �  �Ƿ�������� �������ȡMD5���ı����а����к��֣�����Ϊ�գ����ص�MD5����һ���� 7     �  ����ֵת�ɴ�д �ɿգ�Ĭ��Ϊ�١���=Сд  ��=��д #     �  �Ƿ�ȡ16λ �ɿգ�Ĭ��Ϊ32λ                           j    ��          6W	�     �   ʱ��_ʱ����뵽ʱ��   ��10λ����ʱ���ת����ʱ��           %   �%        �   ʱ��� 10λʱ���                           j    ��          6W	�     �   ʱ��_ȡƫ�ƺ�ʱ���ı�               /   �%    #    �   ƫ������ ��Ϊ������Ӧʱ���                           j    ��          6W	�    �   ʱ��_ȡƫ�ƺ�ʱ���                  �%        �   ƫ������                            j    ��          6W	�     �   ��ҳ_��ȡ��ʵip_����               2   �%    &     �  ���ص���λ��  ��ǰip�ĵ���λ��                           j    ��          6W	�     �   ��ҳ_��ȡ����ip   ��ȡ�������ؿ�                                          j    ��          6W	�     �   ��ҳ_ipȡλ��               1   �%    %     �  ip ��ip���ȡ��ǰip��λ����Ϣ                           j    ��          6W	�     �   ����_��ƥ��               X   �%�%            �   Դ�ı�  1     �   ƥ����� ���ڵ���λ�ã�<code>(.*?)</code>                           j    ��          6W	�     �   dom_ȡip                  �%         �  �������                            j    ��          6W	�     �	   dom_ȡcss                  �%         �  �������                            j    ��          6W	�    �   �ı�_ȡ�ַ�������                  �%         �   �ַ���                            j    ��          6W	�     �   ��ҳ_��ȡ��ʵip_dom   ����ip           )   �%         �  location ��ַλ�òο�                           j    ��          6W	�    �   ����_�����ȼ�M   �����ȼ�ID�����ھ��ֵΪ0ʱ��ʡ��Ϊȫ���ȼ�������ֻ�д˴���Ϊǰ̨����ʱ��Ч��           *  �%�%�%�%�%�%�%    !   ?   S   g   {   �        �   �ӳ���ָ�� �ӳ���ָ��     �   ������1 ���� #F9��     �  ������2      �  ������3      �  ������4  J    �  ���ھ�� ֵΪ0ʱ��ʡ��Ϊȫ���ȼ�������ֻ�д˴���Ϊǰ̨����ʱ��Ч�� %    �  ������ �ȼ������� Ĭ��Ϊ��200                           j    ��          6W	�          ����_�����ȼ��ر�#   �������롾����_�����ȼ���һͬʹ�ã�              �%        �   �ȼ�ID                            j    ��          6W	�          ϵͳ_�����¼�!   ����ͨ�Ĵ����¼��ٶ�Ҫ��3�����ң�                                          j    ��          6W	�     �   ������ʱ+   ��ռ��cpu�����ڲ���������Ӱ����������ִ�С�           �   �%�%    3   /    �  ��ʱ��� 1000���� = 1��  ����Ϊ���޵ȴ� 9    �  ��ʱ��λ Ĭ��Ϊ����  0=����  1=��  2=����  3=Сʱ                           j    ��          6W	�    �   �߳�_�����߳�?   �ɹ������߳̾����ʧ�ܷ���0�����Զ��̲߳��Ǻ��˽�Ļ��������á�           �   �%�%�%    /   p   +     �   �ӳ��� ���Ѹ��ӳ����Զ��̷߳�ʽ���� =    �  �ӳ̲���һ ���Ը����̴߳������ӳ��򴫵�һ������ֵ���� D     �  �����߳� ���ղ���Ϊ����ִ�У�������=���򴴽�һ����������߳�                           j    ��          6W	�    �   ����_�����ȼ�����`   �ɹ������ȼ�ID��ʧ�ܷ���0�����ܼ��룺���ղ�ʹ�ã�1ΪAtl��  2ΪCtrl��  3ΪAlt+Ctrl�� 4ΪShift����             �%�%�%    Y   �   U     �   ��Ӧ�ӳ��� �ȼ�������ʱҪ�������ӳ��򣬸ûص���������һ���������������ȼ�ID�� >    �   ������ ����ʹ���������еļ����볣�������磺#F9��  #M�� N    �  ���ܼ��� ���ձ�ʾ��ʹ��, 1ΪAtl��  2ΪCtrl��  3ΪAlt+Ctrl�� 4ΪShift��                           j    ��          6W	�          ����_�ļ��Ϸ�ע��)   ����_�ļ��Ϸ�ע�ᣬ�ص������뿴����˵����           >  �%�%    5   1    �   �ؼ���� ���ڽ����ϷŵĴ��ھ����ؼ���� �     �   �ص����� ���ڽ����ļ������ӳ���ָ��(����:&�ϷŴ���),Ȼ������ĳ�����һ����Ϊ"�ϷŴ���"���ӳ��򣬰���4��������(����,����,�ı�,�ı�)���е�һ�������ļ���������2���ǵ�ǰ�ǵڼ����ļ�����3���ǵ�ǰ�ļ�·������4���ǵ�ǰ���ļ����ͣ��ļ���׺����                           j    ��          6W	�          ����_�ļ��Ϸ�ж��   ж���ϷŵĴ��ڻ�ؼ����           5   �%    )    �   �ؼ���� ж���ϷŵĴ��ڻ�ؼ����                           j    ��          6W	�     �   ����_�Ƿ�ɼ�P   �жϴ����Ƿ�ɼ����ɼ������档���ڱ���ס����С�������棬ֻ�д��ڱ������򷵻ؼ١�              �%        �   ���ھ��                            j    ��          6W	�     �   ����_������ʾC   ��ʾ����ָ������Ĵ���(�����ʾ������:���ؼ�,�����������ʾ:������)           2   �%    &    �   ���ھ�� Ҫ��ʾ/���صĴ��ھ��                           j    ��          6W	�    �   ����_�ȼ�ע��   ע��ɹ������ȼ�ID,ʧ�ܷ���0.             �%�%�%�%�%       x   �   �       �   ���ھ��  _    �   ���ܼ�״̬ 1��Alt��2��Ctrl��4��Shitf��8��Win����Ҫ���������ϵ�״̬����������ǵ�ֵ���.     �   ������       �   �ӳ���ָ��  :     �  ȫ���ȼ� Ϊ��Ĭ��Ϊ���٣������ȼ�   �棬ȫ���ȼ���                           j    ��          6W	�    �   ����_�ȼ�ж��   �ɹ����ط�0,ʧ�ܷ���0           8   �%�%           �   ���ھ��      �   �ȼ�ID                            j    ��          6W	�    �   ����_ȡ����������   ����ָ�����̵Ķ������ھ��           !   �%        �   ����ID ����ID                           j    ��          6W	�    �   ����_���Ҵ���-   �ɹ����ز��ҵ��Ĵ��ڻ�ؼ��ľ����ʧ�ܷ���0��             �%�%�%�%    5   �   �   1    �  ����� �����ھ������Ϊ�ս�����ĻΪ����� G    �  ��ʼ��� �Ըþ����ʼ���²��ң������Ը��������Ϊ-1������һ�� 7     �  �������� �Դ��ڻ�ؼ����������в��ң�����ϱ��� 9     �  ���ڱ��� �Դ��ڻ�ؼ��ı�������ݲ��ң����������                           j    ��          6W	�    �   ����_ȡ���ڽ���ID1   ȡָ�����ھ���Ĵ��ڽ���ID(���ؽ���ID,ʧ�ܷ���0)               �%        �   ���ھ��                            j    ��          6W	�    �   ����_ȡ�Խ���ID   ȡ��ǰ���ڵĽ���ID                                          j    ��          6W	�    �   ����_ȡ����ھ��   ��û���ڵľ��                                          j    ��          6W	�          ����_������ǰ8   ��ָ��������Ϊ������ǰ,Ĭ��Ϊ��:������ǰ,��:ȡ��������ǰ           o   �%�%    %   !    �   ���ھ�� �����õĴ��ھ�� 6     �  ������ǰ Ĭ��Ϊ ��:������ǰ  ��:ȡ��������ǰ                             j    ��          6W	�          ����_�رմ���   ��ָ����������(�޷���ֵ)           -   �%    !    �   ���ھ�� �����ٴ��ڵľ��                           j    ��          6W	�          ��ҳ_Ĭ���������   ��Ĭ�����������ַ              �%         �   ��ַ                            j    ��          6W	�     �   ϵͳ_ȡMAC��ַ*   ��ȡ��������MAC��ַ(�磺A2:36:42:04:40:30)           `   �%    T     �  Ŀ��IP �ɿգ�Ĭ��Ϊȡ�Լ��ġ�Ҳ����ȡ�������ڵ��������Եġ��磺192.168.1.100                           j    ��          6W	�    �   COM_Release                  �%        �   this_                            j    ��          6W	�    �   COM_���������ռ�-   �ɹ�����һ��IWbemServices��ָ�룬ʧ�ܷ����㡣           -   �%    !     �   ���ֿռ� �硰root\CIMV2��                           j    ��          6W	�    A   COM_StringtoIID%   ��COM�еĽӿ���ת���ɽӿڱ�ʶGUID�ṹ              �%         �   �ӿ�����                            j    ��          6W	�    A   COM_StringToCLSID                  �%         �   ����_�ı�                            j    ��          6W	�    �
   COM_bstr_t                  �%         �   _bstr_t                            j    ��          6W	�    �   ȡ������ָ��                  �%       1     ������                            j    ��          6W	�     �   ϵͳ_����Ƿ����Ա��������Z   ����Ƿ����Ա�������С�����Ϊ��ʹ�ù���Ա�������У�����Ϊδʹ�ù���Ա��������  ����ѽģ��                                          j    ��          6W	�     �   ϵͳ_����ԱȨ������                                              j    ��          6�           _��ť1_������       �   �%�%�%�%�%�%       .   >   N   c        �   ��Ʒ�����ļ�       �   ������Ϣ     PI   jsv       �   bat       �   ����Ŀ¼       �   dataDirectoryName          0          u   �   �   D  }  �  6  �  �  "  	   �   !     ,   ]  �  �  L   %   ,   �   �   �   V  ]  t  �  �  �  �  (  H  a  �  �    :     
  5  j    ��          6j4               68�%7!| ��          8�7   HKEY_CURRENT_USER\Environment    PyCharm j4               68�%7!`               68�%7   bin;    product-info.json ��mn               6!�               68�%7j4               68�%7!Z               6!�               68�%7j4               68�%7! ��          8�78�%7j4               68�%7!' ��          8�� :! ��          8�%7   dataDirectoryName 7j4               68�%7!`               6�   <dataDirectoryName> 8�%7��j4               68�%7!`               68�%7
   %APPDATA% !C               6   APPDATA ��j4               68�9	     78�%7Soj�               63   pycharmδ��ע������ҵ������ֶ�ָ��pycharm����Ŀ¼         Ttj    ��          6�           _��ť2_������       Q   �%�%�%       *        �   ����Ŀ¼       �   �Ƿ�ɹ�       �   py          h       �   �     -  @  �  �  c  �    W  j  �  _  �  +  �  �  O  �  4  �    �  	  $         @  �  �  �  �  V     _   d    �  D  �   6   q       �  �  7  �  �  ;  |  �  �    P  =  h  �  �  �  @  a  �  �  �  %  F  q  �  �    1  \  �  �  		  �       �  �  �  �    [	  l               6!.               6!&               68�9	     7    !&               6!��          68�9	     7  j�               6!               6   ģ��д��ʧ��!      ����Ŀ¼δ֪���߲�����         j               6Rsj4               68�%78�9	     7j    ��          6l               6!&               6!��          6!               68�%7   \fileTemplates\   j�               6!               68�%7   \fileTemplates\ Rsl               6!&               6!��          6!               68�%7   \fileTemplates\internal\   j�               6!               68�%7   \fileTemplates\internal\ Rsl               6!&               6!��          6!               68�%7   \templates\   j�               6!               68�%7   \templates\ Rsj    ��          6j4               68�%7!�               6!               68�%7   \fileTemplates\odoo��ͼ.xml �(jL              8�7!               6
   д�ļ���: 8�%7   \fileTemplates\odoo��ͼ.xml    ? !Z               68�%7  j    ��      f   �Ƿ�ɹ� �� д���ļ� (����Ŀ¼ �� ��\fileTemplates\internal\Python Script.py��, #new_python_sript_py) 6j4               68�%7!`               6�   $ǩ��$ 8�9	     7��j4               68�%7!"��          6!               68�%7)   \fileTemplates\internal\Python Script.py 8�%7j    ��          6jL              8�7!               6
   д�ļ���: 8�%7)   \fileTemplates\internal\Python Script.py    ? !Z               68�%7  j4               68�%7!�               6!               68�%7   \templates\odoo.xml �(jL              8�7!               6
   д�ļ���: 8�%7   \templates\odoo.xml    ? !Z               68�%7  j4               68�%7!�               6!               68�%7   \templates\opython.xml �(jL              8�7!               6
   д�ļ���: 8�%7   \templates\opython.xml    ? !Z               68�%7  j4               68�%7!�               6!               68�%7   \templates\Pycharm�����ֲ�.md �(jL              8�7!               6
   д�ļ���: 8�%7   \templates\Pycharm�����ֲ�.md    ? !Z               68�%7  j�               6    ģ��д��ɹ���������pycharm��Ч         �           _��ť3_������                                             )   j4               68�9	     7    �           _��ť4_������          �%         �   ����Ŀ¼                 *   �       	   *        �              `   �   )      1  j4               68�%78�9	     7l               6!.               6!&               68�%7    !&               6!��          68�%7  j�               6!               6
   ��ʧ��!      ����Ŀ¼δ֪���߲�����         j               6Rsj��          68�%7�           _���¼�¼_��ѡ��                           #                     6   j�               6�        j    ��          6�           _����_��ѡ��                           #                     6   j�               6�        j    ��          6   0   ��          VI   zcb     OI   jst  0    A A A A A	 A��s��s`�s �s��s��s      STJsonParseResult   JSON�������   P   �5�5�5       %        �   stat       �   message     PI   object        URL_COMPONENTS         �5�5�5�5�5�5�5�5�5�5�5�5�5�5�5    +   J   w   �      /  E  b  �  �  �  �  %  k  '    �   dwStructSize ���ṹ���ȣ�ע��60     �   lpszScheme Э������ )    �   dwSchemeLength Э�����ͻ��������� ^    �   nScheme �������ͣ�1=http��2=https����INTERNET_SCHEME_HTTP=1��INTERNET_SCHEME_HTTPS=2�� #    �   lpszHostName ��������(Host) +    �   dwHostNameLength ������������������     �   nPort �˿�     �   lpszUserName �ʺ� '    �   dwUserNameLength �ʺŻ���������     �   lpszPassword ���� '    �   dwPasswordLength ���뻺�������� "    �   lpszUrlPath ·��(ҳ���ַ) &    �   dwUrlPathLength ·������������ B    �   lpszExtraInfo ������Ϣ�����硰?����#��֮��Ĳ����ַ����� &    �   dwExtraInfoLength ������Ϣ����    	   ����_ʱ��   , SYSTEMTIME   �   �5�5�5�5�5�5�5�5       )   :   M   a   w   �       �   �� wYear     �   �� wMonth     �   ����      �   �� wDay     �   ʱ wHour     �   �� wMinute     �   �� wSecond     �   �� wMilliseconds       POINTAPI   ����   ,   �5�5       
    �   x  
    �   y        GUID       l   �5�5�5�5       $   6       �   Data1      �   Data2      �   Data3      �     Data4        ����_���̽ṹ       �   �5�5�5�5       9   [       �   ���̾�� hProcess     �   �߳̾�� hThread     �   ���̱�ʶ�� dwProcessId     �   �̱߳�ʶ�� dwThreadId �  X
Y
Z
[
\
]
^
_
`
a
b
c
d
e
f
g
h
i
j
k
l
m
n
o
p
q
r
s
t
u
v
w
x
y
z
{
|
}
~

�
�
�
�
�
�
�
�
�
�
�
�
0�s��s��s@�s�s��sP�s �s��s`�s�s��sp�s �sКs��s0�s��s��s@�s�s��sP�s �s��s`�s�s��sp�s �sЕs��s0�s��s��s@�s�s��sP�s �s��s`�s�s��sp�s �sАs��s0�s��s`�s�s    �   GetDateFormatAJ   ���ָ���ġ����ء���ʽ����һ��ϵͳ���ڽ��и�ʽ��  ��ʽ��������ִ��ĳ��ȡ�   kernel32.dll   GetDateFormatA   �  �E�E�E�E�E�E    u     ;  �     q    �   �ط�ID Locale�����ھ�����ʽ�ĵط�ID��lpFormat������ָ�����κ���Ϣ����������NULL�����������ض��ڵط�����Ϣ �    �   ��־ dwFlags����ָ����lpFormat����ô�ò���Ӧ��Ϊ�㡣���򣬿���ΪLOCALE_NOUSEROVERRIDE��ǿ��ʹ��ϵͳ�ط�����������ʹ���������û�ȡ���� 1    A   ���ڽṹ lpDate��������һ��ϵͳ���ڵĽṹ }     �   ��ʽ�� lpFormat��String������ΪNULL��ʹ���ض��ڲ�ͬ�ط���ֵ����vbNullString����һ��NULL�����������һ�����ڸ�ʽ�ִ��� `     �   �������ı� lpDateStr��ָ��һ�����������������ɸ�ʽ��������ִ���ע�����ȶ��ִ����г�ʼ�� U    �   �������ı����� cchDate���������ĳ��ȡ���Ϊ�㣬��ʾ�����᷵����Ҫ�������Ĵ�С;     �   GetTimeFormatAH   _ϵͳ��ʱ����и�ʽ�� ���ָ���ġ����ء���ʽ����һ��ϵͳʱ����и�ʽ����   kernel32.dll   GetTimeFormatA   �  �E�E�E�E�E�E    u   �   /  �  �  q    �   �ط�ID Locale�����ھ�����ʽ�ĵط�ID��lpFormat������ָ�����κ���Ϣ����������NULL�����������ض��ڵط�����Ϣ s    �   ��־ dwFlags����ָ����lpFormat����ô�ò���Ӧ��Ϊ�㡣���򣬿���ΪLOCALE_NOUSEROVERRIDE��ǿ��ʹ��ϵͳ�ط����� ?    A   ʱ��ṹ lpDate��SYSTEMTIME�����ڰ���ϵͳʱ���һ���ṹ c     �   ��ʽ�� lpFormat��String������ΪNULL��ʹ���ض��ڲ�ͬ�ط���ֵ����vbNullString����һ��NULL���� `     �   �������ı� lpDateStr��ָ��һ�����������������ɸ�ʽ��������ִ���ע�����ȶ��ִ����г�ʼ�� U    �   �������ı����� cchDate���������ĳ��ȡ���Ϊ�㣬��ʾ�����᷵����Ҫ�������Ĵ�С;     �   GetLocaleInfo       kernel32   GetLocaleInfoA   j   �E�E�E�E       $   5       �   �ط�ID      �   ����       �   ����      �   ���ݳߴ�      �   VariantTimeToSystemTime       oleaut32.dll   VariantTimeToSystemTime   ;   �E�E            �   vtime      A   lpSystemTime       �
   CharUpperA   ���ַ����е���ĸ��ת���ɴ�д��
   user32.dll
   CharUpperA      �E         �   str       �
   CharLowerA   ���ַ����е���ĸ��ת����Сд��
   user32.dll
   CharLowerA      �E         �   str      �   WideCharToMultiByte       kernel32.dll   WideCharToMultiByte     �E�E�E�E�E�E�E�E       )   C   [   v   �   �       �   CodePage      �   dwFlags      �   lpWideCharStr      �   cchWideChar      �   lpMultiByteStr      �   cbMultiByte      �   lpDefaultChar      �   lpUsedDefaultChar       �   WinHttpQueryHeaders   BOOL WINAPI WinHttpQueryHeaders   Winhttp.dll   WinHttpQueryHeaders   a  �E�E�E�E�E�E    1   d   �   �      -    �   hRequest __in      HINTERNET hRequest /    �   dwInfoLevel __in      DWORD dwInfoLevel +    �   pwszName __in_opt  LPCWSTR pwszName *     �   lpBuffer __out     LPVOID lpBuffer ;    �  lpdwBufferLength __inout   LPDWORD lpdwBufferLength -    �  lpdwIndex __inout   LPDWORD lpdwIndex      �   WinHttpReadData   BOOL WINAPI WinHttpReadData   Winhttp.dll   WinHttpReadData     �E�E�E�E    .   Y   �   *    �   hRequest __in   HINTERNET hRequest '     �   lpBuffer __out  LPVOID lpBuffer @    �   dwNumberOfBytesToRead __in   DWORD dwNumberOfBytesToRead B    �  lpdwNumberOfBytesRead __out  LPDWORD lpdwNumberOfBytesRead      �   WinHttpQueryDataAvailable   ��ѯ�Ƿ��пɶ�����   Winhttp.dll   WinHttpQueryDataAvailable   `   �E�E           �   hRequest ������ /    �  lpdwNumberOfBytesAvailable �ɶ����ݳ���      �   WinHttpReceiveResponse"   BOOL WINAPI WinHttpReceiveResponse   Winhttp.dll   WinHttpReceiveResponse   w    EE    3   /    �   hRequest __in        HINTERNET hRequest 0    �   lpReserved __reserved  LPVOID lpReserved      �   WinHttpSendRequest   BOOL WINAPI WinHttpSendRequest   Winhttp.dll   WinHttpSendRequest   �  EEEEEEE    1   f   �   �     G  -    �   hRequest __in      HINTERNET hRequest 1    �   pwszHeaders __in_opt  LPCWSTR pwszHeaders 7    �   dwHeadersLength __in      DWORD dwHeadersLength .     �   lpOptional __in_opt  LPVOID lpOptional 9    �   dwOptionalLength __in      DWORD dwOptionalLength 3    �   dwTotalLength __in      DWORD dwTotalLength /    �   dwContext __in      DWORD_PTR dwContext      �   WinHttpAddRequestHeaders$   BOOL WINAPI WinHttpAddRequestHeaders   Winhttp.dll   WinHttpAddRequestHeaders   �   	E
EEE    -   ^   �   )    �   hRequest __in  HINTERNET hRequest -     �   pwszHeaders __in  LPCWSTR pwszHeaders 3    �   dwHeadersLength __in  DWORD dwHeadersLength +    �   dwModifiers __in  DWORD dwModifiers      �   WinHttpSetOption   BOOL WINAPI WinHttpSetOption   Winhttp.dll   WinHttpSetOption   �   EEEE    /   X   �   +    �   hInternet __in  HINTERNET hInternet %    �   dwOption __in  DWORD dwOption &    �  lpBuffer __in  LPVOID lpBuffer 1    �   dwBufferLength __in  DWORD dwBufferLength      �   WinHttpCloseHandle   BOOL WINAPI WinHttpCloseHandle   Winhttp.dll   WinHttpCloseHandle   7   E    +    �   hInternet __in  HINTERNET hInternet     �   WinHttpOpenRequest#   HINTERNET WINAPI WinHttpOpenRequest   Winhttp.dll   WinHttpOpenRequest   �  EEEEEEE    -   X   �   �   �   /  )    �   hConnect __in  HINTERNET hConnect '     �   pwszVerb __in  LPCWSTR pwszVerb 3     �   pwszObjectName __in  LPCWSTR pwszObjectName -    �   pwszVersion __in  LPCWSTR pwszVersion /    �   pwszReferrer __in  LPCWSTR pwszReferrer 8    �   ppwszAcceptTypes __in  LPCWSTR *ppwszAcceptTypes #    �   dwFlags __in  DWORD dwFlags     �   WinHttpConnect   HINTERNET WINAPI WinHttpConnect   Winhttp.dll   WinHttpConnect      EEEE    3   p   �   /    �   hSession __in        HINTERNET hSession 9     �   pswzServerName __in        LPCWSTR pswzServerName 9    �   nServerPort __in        INTERNET_PORT nServerPort /    �   dwReserved __reserved  DWORD dwReserved      �   WinHttpSetTimeouts   BOOL WINAPI WinHttpSetTimeouts   Winhttp.dll   WinHttpSetTimeouts   -  EEE E!E    /   f   �   �   +    �   hInternet __in  HINTERNET hInternet 3    �   dwResolveTimeout __in  int dwResolveTimeout 3    �   dwConnectTimeout __in  int dwConnectTimeout -    �   dwSendTimeout __in  int dwSendTimeout 3    �   dwReceiveTimeout __in  int dwReceiveTimeout     �   WinHttpOpen   HINTERNET WINAPI WinHttpOpen   Winhttp.dll   WinHttpOpen   7  "E#E$E%E&E    9   n   �   �   5    �   pwszUserAgent __in_opt  LPCWSTR pwszUserAgent 1    �   dwAccessType __in      DWORD dwAccessType 5     �   pwszProxyName __in      LPCWSTR pwszProxyName 9    �   pwszProxyBypass __in      LPCWSTR pwszProxyBypass '    �   dwFlags __in      DWORD dwFlags      �   WinHttpCrackUrl       Winhttp.dll   WinHttpCrackUrl   |   'E(E)E*E       ,   @        �   pwszUrl      �   dwUrlLength      �   dwFlags      A   lpUrlComponents       �   WinHttpCheckPlatform    BOOL WinHttpCheckPlatform(void);   Winhttp.dll   WinHttpCheckPlatform            �   MultiByteToWideChar1   �ú���ӳ��һ���ַ�����һ�����ַ���unicode�����ַ�   Kernel32.dll   MultiByteToWideChar   �   +E,E-E.E/E0E       )   D   ]   w       �   CodePage      �   dwFlags      �   lpMultiByteStr      �   cchMultiByte      �   lpWideCharStr      �   cchWideChar      �   PathIsDirectoryA   Ŀ¼�Ƿ����   shlwapi.dll   PathIsDirectoryA      1E         �   lpszPath      �   SendMessageA    
   user32.dll   SendMessageA   �   2E3E4E5E       -   N       �   hWnd      �   Msg ��Ϣ�ı�ʶ��     �   wParam ����ȡ������Ϣ     �   lParam ����ȡ������Ϣ     �   AddFontResourceA   ��Windowsϵͳ������һ��������Դ	   gdi32.dll   AddFontResourceA      6E         �   LPCSTR       �   RemoveFontResourceA<   ͨ������£�ֻ����ж���ɡ�AddFontResourceA()����װ��������Դ	   gdi32.dll   RemoveFontResourceA      7E         �   LPCSTR      �   CryptCreateHash       advapi32.dll   CryptCreateHash   �   8E9E:E;E<E       $   5   I       �   hProv      �   Algid      �   hKey      �   dwFlags      �  phHash      �   CryptReleaseContext       advapi32.dll   CryptReleaseContext   6   =E>E           �   hProv      �   dwFlags      �   CryptDestroyHash       advapi32.dll   CryptDestroyHash      ?E        �   hHash      �   CryptHashData       advapi32.dll   CryptHashData   o   @EAEBECE       %   ;       �   hHash       �  pbData      �   dwDataLen      �   dwFlags      �   CryptGetHashParam       advapi32.dll   CryptGetHashParam   �   DEEEFEGEHE       &   8   O       �   hHash      �   dwParam       �   pByte      �  pdwDataLen      �   dwFlags      �   CryptAcquireContextA       advapi32.dll   CryptAcquireContextA   �   IEJEKELEME       ,   D   [       �  phProv       �   pszContainer       �   pszProvider      �   dwProvType      �   dwFlags      �   SendARP       IPHLPAPI.DLL   SendARP   k   NEOEPEQE       &   :       �   Ŀ��IP      �   ����IP      �
  MAC����      �  ����      �   lstrcat_int2variant       kernel32.dll   lstrcatA   <   RESE          1    lpString1      �  lpString2      �	   inet_addr    
   ws2_32.dll	   inet_addr      TE         �   IP      �   lstrcpyn_�ı���
   ȡָ���ַ   kernel32.dll   lstrcpyn   I   UEVEWE                �  Ŀ��       �  Դ      �   ����      �   GetProcAddress   ȡ��̬���ӿ⺯����ڵ�ַ   kernel32.dll   GetProcAddress   R   XEYE    -   )    �   ģ���� ͨ��LoadLibraryA����ȡ��      �   �ӿ�����      �   SetWaitableTimer       kernel32.dll   SetWaitableTimer   �   ZE[E\E]E^E_E       (   <   ]   �       �   hTimer     �A   pDueTime      �   lPeriod      �   pfnCompletionRoutine  !    �   lpArgToCompletionRoutine       �   fResume      �   MsgWaitForMultipleObjects    
   User32.dll   MsgWaitForMultipleObjects   �   `EaEbEcEdE       (   =   X       �   nCount      �  pHandles       �   fWaitAll      �   dwMilliseconds      �   dwWakeMask      �   CreateWaitableTimerA   ������ʱ   kernel32.dll   CreateWaitableTimerA   g   eEfEgE       7       �   lpTimerAttributes       �   bManualReset      �   lpTimerName      �   RegDeleteKeyAe   _ע���_ɾ����ɾ���������·�һ��ָ��������  �㣨ERROR_SUCCESS����ʾ�ɹ��������κ�ֵ������һ���������   advapi32.dll   RegDeleteKeyA   �   hEiE    5   1    �   hKey һ���Ѵ���ľ�������߱�׼����֮һ :     �   lpSubKey Ҫɾ��������֡���������������Ҳ��ɾ��;     �   RegOpenKeyExA       advapi32.dll   RegOpenKeyExA   �   jEkElEmEnE       &   <   S       �   hKey       �   lpSubKey      �   ulOptions      �   samDesired      �  phkResult      �   RegCreateKeyExA       advapi32.dll   RegCreateKeyExA	     oEpEqErEsEtEuEvEwE       &   ;   O   e   |   �   �       �   hKey       �   lpSubKey      �   Reserved      �   lpClass      �   dwOptions      �   samDesired      �   lpSecurityAttributes      �  phkResult      �  lpdwDisposition      �   RegSetValueExAU   _ע���_��ֵ����ָ�����ֵ  �㣨ERROR_SUCCESS����ʾ�ɹ��������κ�ֵ������һ���������   advapi32.dll   RegSetValueExA   (  xEyEzE{E|E}E    7   ]   ~   �   �   3    �   hKey һ���Ѵ���ľ������ָ��һ����׼���� "     �   lpValueName Ҫ����ֵ������     �   Reserved δ�ã���Ϊ��     �   dwType Ҫ���õ��������� -     �   lpData �������ݵĻ������еĵ�һ���ֽ� "    �   cbData lpData�������ĳ���;     �   RegEnumKeyA   _ע���_ö������   advapi32.dll   RegEnumKeyA   k   ~EE�E�E       %   8       �   hKey      �   dwIndex       �  lpName      �   cbName      �   RegEnumValueAH   _ע���_ö��ֵ �㣨ERROR_SUCCESS����ʾ�ɹ��������κ�ֵ������һ���������   advapi32.dll   RegEnumValueA   E  �E�E�E�E�E�E�E�E    9   x   �     :  s  �  5    �   ��� һ���Ѵ���ľ��������ָ��һ����׼���� ;    �   �������� ����ȡֵ��������ע���һ��ֵ���������Ϊ�� 5     �   �Ӽ��� ����װ��λ��ָ��������ֵ����һ�������� d    �  �Ӽ����� ����װ��lpValueName���������ȵ�һ��������һ�����أ�������Ϊʵ�����뻺�������ַ�����     �   lpReserved δ����Ϊ�� 5    �  ��ֵ���� ֵ�����ͣ�����װ��ֵ�����ʹ���ı��� +     �  ��ֵ���� ����װ��ֵ���ݵ�һ�������� _    �  ��ֵ���� ����װ��lpData���������ȵ�һ��������һ�����أ�������Ϊʵ�����뻺�������ַ�����     �   RegOpenKeyA`   _ע���_���� ��һ�����е�ע�����  �㣨ERROR_SUCCESS����ʾ�ɹ��������κ�ֵ������һ���������   advapi32.dll   RegOpenKeyA   �   �E�E�E    7   X   3    �   hKey һ���Ѵ���ľ������ָ��һ����׼����      �   lpSubKey Ҫ�򿪵����� G    �  phkResult ָ��һ������������װ�أ����棩��ע������һ�����;     �   RegCloseKeyv   _ע���_�ر��� advapi32.dll�ر�ϵͳע����е�һ��������  �㣨ERROR_SUCCESS����ʾ�ɹ��������κ�ֵ������һ���������   advapi32.dll   RegCloseKey   $   �E        �   hKey Ҫ�رյ���;     �   RegCreateKeyA�   _ע���_������ advapi32.dll��ָ�������´���һ�������ָ�������Ѿ����ڣ���ô����������е���  �㣨ERROR_SUCCESS����ʾ�ɹ��������κ�ֵ������һ���������   advapi32.dll   RegCreateKeyA   �   �E�E�E    1   �   -    �   hKey Ҫ����ľ��������һ����׼���� i     �   lpSubKey ���������������ͬʱ��������ֻ���÷�б�ܽ����Ƿָ������ɡ�����level1\level2\newkey 5    �  phkResult ָ��һ������������װ��������ľ��;     �   RegQueryValueExAY   _ע���_ȡֵ��ȡһ���������ֵ  �㣨ERROR_SUCCESS����ʾ�ɹ��������κ�ֵ������һ���������   advapi32.dll   RegQueryValueExA   t  �E�E�E�E�E�E    9   _   �   �   �   5    �   hKey һ���Ѵ���ľ��������ָ��һ����׼���� "     �   lpValueName Ҫ��ȡֵ������     �   lpReserved δ�ã���Ϊ�� -    �  lpType ����װ��ȡ���������͵�һ������ )     �  lpData ����װ��ָ��ֵ��һ�������� `    �  lpcbData ����װ��lpData���������ȵ�һ��������һ�����أ�������Ϊʵ��װ�ص����������ֽ���;     �   RegOpenCurrentUser       advapi32.dll   RegOpenCurrentUser   =   �E�E           �   samDesired      �  phkResult      �   GetModuleHandleB
   ȡģ����   kernel32.dll   GetModuleHandleA   !   �E         �   lpModuleName                                          s��CJs �׽��»��<s s s s s             ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      s��}Ds ��¥������s s s s s                                                               s�ׇ�s ��Ⱥ��ޱ���s s s s s          S&Eoj                                                 � �����;�    
   �������ݿ�   $��������ģ��.ec    AX
�NI
       4   H   
   D  s����s ��˺��ޱ���A s s s s                                                                  s�� 
s ˨���Ļ��9s s s s s   	        @P                                           NI   OI   PI   QI   RI   SI   TI   UI   VI   W	   s>��Us �ɳ����գ��s s s s s   
      �>_�9                                              E:\eplwork\odoo��ݼ�.exe                        ����s6��s 	�൴��ƻ��;s 	s 	s 	s 	s         ����s                                                   	  � �              �            �           �            R   �  � � D   D   s��"Ks 
˨���Ż��;s 
s 
s 
s 
s            `                                            R�    � R�    � R�    � R�    � R�&    � R�&    �ss s                                                                                        