class Message < Dove::Base

  define_data_fields(:READ_FIELD, [
    :id,
    :sid,
    :rid,
    :genre,
    :project_name,
    :description
  ])

  define_data_fields(:WRITE_FIELD, [
    :sid,
    :rid,
    :genre,
    :project_name,
    :description
  ])
end
